import { __GLOBAL__, isEmpty, isFunction, isObject } from "@m78/utils";
import _debounce from "lodash/debounce";
import _throttle from "lodash/throttle";
import React, { useEffect, useState } from "react";
import {
  useEffectEqual,
  useFn,
  useSelf,
  useSetState,
  useStorageState,
  SetStateBase,
} from "@m78/hooks";

const GLOBAL = __GLOBAL__ as Window;

/* TODO: 自动重试、窗口聚焦、失焦 */

interface UseFetchOptions<Data, Payload> {
  /** [] | 类似useEffect(fn, deps)，当依赖数组内的值发生改变时，会以当前参数进行更新请求, 请勿传入未memo的引用类型值 */
  deps?: any[];
  /** 传递给请求函数的参数, 当发生改变时，会以新值发起调用请求。传递此项时，Payload会被忽略。与payload共用Payload类型 */
  param?: Payload;
  /** false | 只能通过send来触发请求 */
  manual?: boolean;
  /** 10000 | 超时时间 ms */
  timeout?: number;
  /** true | 只有为true时才会发起请求, 可以用来实现串联请求 */
  pass?: boolean;
  /** 初始data */
  initData?: (() => Data) | Data;
  /** 初始payload, 在不存在param配置时，作为参数传递给请求方法 */
  initPayload?: (() => Payload) | Payload;
  /** 成功回调, 当为更新请求(通过无参调用send、deps等配置发起请求)时，isUpdate为true */
  onSuccess?: (result: Data, isUpdate: boolean) => void;
  /** 错误回调， error为请求函数中抛出的错误 */
  onError?: (error: any) => void;
  /** 无论成功与否都会调用。在旧的请求被新的请求覆盖掉时，不会触发。 */
  onComplete?: () => void;
  /** 请求超时的回调 */
  onTimeout?: () => void;
  /** 用于缓存的key，传递后，会将(payload, data, arg)缓存到session中，下次加载时将读取缓存数据作为初始值 */
  cacheKey?: string;
  /** true | 当传入了cacheKey且存在缓存数据时，是否进行swr(stale-while-revalidate)请求 */
  stale?: boolean;
  /** 节流间隔时间，传入时，开启节流, 只有初始化时的配置会生效 */
  throttleInterval?: number;
  /** 防抖间隔时间，传入时，开启防抖, 只有初始化时的配置会生效, 当存在throttleInterval时，此配置不会生效 */
  debounceInterval?: number;
  /** 轮询间隔, 大于500时生效 */
  pollingInterval?: number;
}

interface UseFetchReturns<Data, Payload> {
  /** 是否正在请求 */
  loading: boolean;
  /** method方法reject时，error为它reject的值。 */
  error: any;
  /** 请求超时设置为true */
  timeout: boolean;
  /** method方法resolve的值或initData */
  data: Data;
  /** 当前用于请求的payload或initPayload */
  payload: Payload;
  /** 当前用于请求的param */
  param: Payload;
  /** 设置当前的data */
  setData: SetStateBase<Data>;
  /** 取消请求 */
  cancel: () => void;
  /** 轮询的开关状态，轮询还依赖于pollingInterval配置，只有两者同时有效时才会开启轮询 */
  polling: boolean;
  /** 设置轮询状态 */
  setPolling(patch: boolean | ((prev: boolean) => boolean)): void;
  /**
   * 根据参数类型不同，会有不同效果:
   * - 带参数: 以新的payload发起请求并设置payload
   * - 无参数/参数为合成事件: 以当前参数发起更新请求
   * - 传入了param配置项: 当存在param配置，一律视为更新并以当前param的值发起更新. 此时，传入的payload会被忽略
   *
   * 返回错误优先的Promise:
   * - 如果该次请求有效，返回一个必定resolve数组[err, res]的Promise，err为reject的结果(不为null说明该次请求发生了错误)，res为resolve的结果
   * - 如果请求被pass等阻断，返回数组的第一线会是一个错误对象
   * */
  send: (
    newPayload?:
      | Payload
      | React.SyntheticEvent
      | undefined /* SyntheticEvent是为了直接将send绑定给onClick等时不出现类型错误 */
  ) => Promise<[any, Data]>;
}

/** 简单的判断是否为合成事件 */
function isSyntheticEvent(arg: any) {
  if (!arg) return false;

  return (
    isObject(arg) && "nativeEvent" in arg && "target" in arg && "type" in arg
  );
}

function useFetch<Data = any, Payload = any>(
  /** 一个Promise return函数或async函数, 当不为函数时不会走请求流程 */
  method?: ((...arg: any[]) => Promise<Data>) | any,
  /** 配置项 */
  options = {} as UseFetchOptions<Data, Payload>
) {
  const self = useSelf({
    /** 请求的唯一标示，在每一次请求开始前更新，并作为请求有效性的凭据 */
    fetchID: 0,
    /** 完成请求次数 */
    fetchCount: 0,
    /** 超时计时器 */
    timeoutTimer: 0,
    /** 处理轮询状态 */
    lastFetch: Date.now(),
  });
  const {
    initData,
    initPayload,
    deps = [],
    param,
    manual = false,
    timeout = 10000,
    onSuccess,
    onError,
    onComplete,
    onTimeout,
    cacheKey,
    stale = true,
    throttleInterval,
    debounceInterval,
    pollingInterval,
    pass: aPass = true,
  } = options;

  const isCache = !!cacheKey; // 包含用于缓存的key并且非isPost时，缓存才会生效

  const pass = aPass && isFunction(method);

  const [state, setState] = useSetState({
    loading: !manual && pass,
    error: undefined as any,
    timeout: false,
  });

  // 防止卸载后赋值
  useEffect(() => {
    return () => {
      self.fetchID = 0; // 超时后阻止后续赋值操作
      self.timeoutTimer && GLOBAL.clearTimeout(self.timeoutTimer);
    };
  }, []);

  const [payload, setPayload] = useStorageState(
    `${cacheKey}_FETCH_PAYLOAD`,
    initPayload,
    {
      disabled: !isCache,
    }
  );

  const [data, setData] = useStorageState(`${cacheKey}_FETCH_DATA`, initData, {
    disabled: !isCache,
  });

  const [polling, setPolling] = useState(true);

  const fetchHandel = useFn(
    async function _fetchHandel(args: any, isUpdate = false) {
      if (!pass) {
        return [new Error("the request has been ignored"), null];
      }

      self.lastFetch = Date.now();

      const cID = Math.random();
      self.fetchID = cID;

      // 清除上一个计时器
      self.timeoutTimer && GLOBAL.clearTimeout(self.timeoutTimer);
      self.timeoutTimer = GLOBAL.setTimeout(() => {
        cancel();
        onTimeout?.();
        setState({
          ...getResetState("timeout", true),
        });
      }, timeout);

      // 记录当前计时器
      const cTimeoutTimer = self.timeoutTimer;

      // 减少更新次数
      if (!state.loading) {
        setState({
          ...getResetState("loading", true),
        });
      }

      try {
        const res = await method(args);
        if (cID === self.fetchID) {
          setState({
            ...getResetState("loading", false),
          });
          setData(res);
          onSuccess?.(res, isUpdate);
          return [undefined, res];
        }
      } catch (err) {
        if (cID === self.fetchID) {
          setState({
            ...getResetState("error", err),
          });
          onError?.(err);
          return [err, undefined];
        }
      } finally {
        // 清理当前计时器
        cTimeoutTimer && GLOBAL.clearTimeout(cTimeoutTimer);

        if (cID === self.fetchID) {
          onComplete?.();
          self.fetchCount++;
        }
      }

      // 仅用于保证类型正确
      return [new Error("never execute"), null];
    },
    (fn) => {
      if (throttleInterval) {
        return _throttle(fn, throttleInterval, { trailing: false }); // 对于请求，应该禁止尾随调用
      }

      if (debounceInterval) {
        return _debounce(fn, debounceInterval);
      }

      return fn as any;
    }
  );

  /** 手动发起请求 */
  const send = useFn((newPayload?: Payload) => {
    const isUpdate = isSyntheticEvent(newPayload) || newPayload === undefined;
    return fetchHandel(getActualPayload(newPayload), isUpdate);
  });

  /** 监听param改变并执行缓存更新，发起请求 */
  useEffectEqual(() => {
    if (!("param" in options)) return;
    if (self.fetchCount === 0 || manual) return;
    fetchHandel(getActualPayload(), false); // 走到这里说明参数已经改变了
  }, [param]);

  /** 执行一些自动触发请求的操作 */
  useEffect(() => {
    if (manual || !pass) return;
    // 初次请求时，如果有数据且禁用了stale，取消请求
    if (!stale && self.fetchCount === 0 && !isEmpty(data)) {
      setState({
        loading: false,
      });
      return;
    }
    fetchHandel(getActualPayload(), self.fetchCount !== 0);
  }, [pass, ...deps]);

  /** 轮询处理 */
  useEffect(
    function intervalHandle() {
      let timer: number;

      if (polling && pollingInterval && pollingInterval > 500) {
        timer = GLOBAL.setInterval(() => {
          const now = Date.now();
          const last = self.lastFetch;
          const reFetch = now - last >= pollingInterval;
          reFetch && send();
        }, pollingInterval);
      }

      return () => {
        timer && clearInterval(timer);
      };
    },
    [pollingInterval, polling]
  );

  /** 接受可选的新payload，并根据条件返回传递给fetchHandel的参数(使用param或payload) */
  function getActualPayload(newPayload?: Payload) {
    // 包含param配置项，使用当前param更新
    if ("param" in options) {
      return param;
    }

    // 参数为合成事件或未传，视为更新请求，使用当前payload进行更新请求
    if (isSyntheticEvent(newPayload) || newPayload === undefined) {
      return payload;
    }

    // 包含新的payload，更新payload值并使用新的payload更新请求
    setPayload(newPayload as Payload); // 同步新的payload
    return newPayload;
  }

  /** 返回一个将互斥的状态还原的对象，并通过键值覆盖设置某个值 */
  function getResetState(key?: string, value?: any) {
    const resetState: any = {
      loading: false,
      error: undefined,
      timeout: false,
    };

    if (key) {
      resetState[key] = value;
    }

    return resetState;
  }

  /** 取消请求 */
  function cancel() {
    self.fetchID = 0; // 超时后阻止后续赋值操作
    self.timeoutTimer && GLOBAL.clearTimeout(self.timeoutTimer);
    setState({
      loading: false,
    });
  }

  return {
    ...state,
    send,
    data,
    payload,
    param,
    setData,
    cancel,
    polling,
    setPolling,
  } as any as UseFetchReturns<Data, Payload>;
}

export { useFetch };
