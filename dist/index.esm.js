import { useRef, useState, useCallback, useEffect } from 'react';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import { isFunction } from '@lxjx/utils';
import { createBreakpoint, useUpdateEffect } from 'react-use';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';

/** 返回类似类组件的this的实例属性 */

function useSelf() {
  var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var self = useRef(init);
  return self.current;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/* 与react-use的useSetState一样, 但是额外返回了一个setOverState用于覆盖状态 */

var useSetState = function useSetState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      set = _useState2[1];

  var setState = useCallback(function (patch) {
    set(function (prevState) {
      return _objectSpread({}, prevState, {}, patch instanceof Function ? patch(prevState) : patch);
    });
  }, [set]);
  return [state, setState, set];
};

/**
 * 可以把它理解为类组件setState API风格的useSelf，但它包含以下特点
 * 1. 在setState之后，可以立即通过`state.xx`获取新的值
 * 2. 在一些被memo的回调中，即使没有设置更新数组，依然可以通过state获取到最新的值
 * 3. 总之，它使用useSelf这样的可以在函数组件内任何地方使用的实例属性，又能在setState后触发组件的更新
 * */

function useSyncState() {
  var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      update = _useState2[1];

  var self = useSelf(init);

  function setSelf(patch) {
    if (typeof patch === 'function') {
      setHandle(patch(self));
    } else {
      setHandle(patch);
    }
  }

  function setHandle(patch) {
    // 编译设置新值
    for (var _i = 0, _Object$entries = Object.entries(patch); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      self[key] = value;
    } // 触发更新


    update(function (prev) {
      return prev + 1;
    });
  }

  return [self, setSelf];
}

function useIsInitMount() {
  var count = useRef(0);
  var isInit = count.current === 0;
  useEffect(function () {
    count.current++;
  }, []);
  return isInit;
}

var BASE_KEY = 'USE_SESSION_STATE_CACHE';

function setSessionState(key, beCache) {
  window.sessionStorage.setItem("".concat(BASE_KEY, "_").concat(key.toUpperCase()), JSON.stringify(beCache));
}

function getSessionState(key) {
  var cache = window.sessionStorage.getItem("".concat(BASE_KEY, "_").concat(key.toUpperCase()));
  return cache === null ? cache : JSON.parse(cache);
}

function useSessionState(key, initialState, option) {
  var _ref = option || {},
      _ref$disable = _ref.disable,
      disable = _ref$disable === void 0 ? false : _ref$disable;

  var _useState = useState(function () {
    if (!disable) {
      var cache = getSessionState(key);

      if (cache !== null) {
        // null以外的值都视为缓存
        return cache;
      }
    }

    if (initialState instanceof Function) {
      return initialState();
    }

    return initialState;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _setState = useCallback(function (patch) {
    if (patch instanceof Function) {
      setState(function (prev) {
        var patchRes = patch(prev);
        !disable && setSessionState(key, patchRes);
        return patchRes;
      });
    } else {
      !disable && setSessionState(key, patch);
      setState(patch);
    } // eslint-disable-next-line

  }, [setState]);

  return [state, _setState];
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/* 与react-use的useSetState一样, 但是额外返回了一个setOverState用于覆盖状态 */

var useSessionSetState = function useSessionSetState(key) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 ? arguments[2] : undefined;

  var _useSessionState = useSessionState(key, initialState, options),
      _useSessionState2 = _slicedToArray(_useSessionState, 2),
      state = _useSessionState2[0],
      set = _useSessionState2[1];

  var setState = useCallback(function (patch) {
    set(function (prevState) {
      return _objectSpread$1({}, prevState, {}, patch instanceof Function ? patch(prevState) : patch);
    });
  }, [set]);
  return [state, setState, set];
};

var placeHolderFn = function placeHolderFn() {
  return undefined;
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var useFetch = function useFetch(method) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$pass = options.pass,
      pass = _options$pass === void 0 ? true : _options$pass,
      _options$inputs = options.inputs,
      inputs = _options$inputs === void 0 ? [] : _options$inputs,
      _options$isPost = options.isPost,
      isPost = _options$isPost === void 0 ? false : _options$isPost,
      initData = options.initData,
      initPayload = options.initPayload,
      initExtraData = options.initExtraData,
      _options$timeout = options.timeout,
      timeout = _options$timeout === void 0 ? 8000 : _options$timeout,
      pollingInterval = options.pollingInterval,
      cacheKey = options.cacheKey,
      _options$onSuccess = options.onSuccess,
      onSuccess = _options$onSuccess === void 0 ? placeHolderFn : _options$onSuccess,
      _options$onError = options.onError,
      onError = _options$onError === void 0 ? placeHolderFn : _options$onError,
      _options$onComplete = options.onComplete,
      onComplete = _options$onComplete === void 0 ? placeHolderFn : _options$onComplete,
      _options$onTimeout = options.onTimeout,
      onTimeout = _options$onTimeout === void 0 ? placeHolderFn : _options$onTimeout;
  var isCache = !!cacheKey && !isPost; // 包含用于缓存的key并且非isPost时，缓存才会生效

  /* pass规则：为函数时取返回值，函数内部报错时取false，否则直接取pass的值 */

  var isPass = pass;

  if (isFunction(pass)) {
    try {
      isPass = pass();
    } catch (err) {
      isPass = false;
    }
  }

  var self = useSelf({
    isUpdate: false,
    lastFetch: Date.now()
  });
  var isInit = useIsInitMount();

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      force = _useState2[0],
      forceUpdate = _useState2[1];

  var _useSessionSetState = useSessionSetState("".concat(cacheKey, "_FETCH_PAYLOAD"), initPayload, {
    disable: !isCache
  }),
      _useSessionSetState2 = _slicedToArray(_useSessionSetState, 3),
      payload = _useSessionSetState2[0],
      setPayload = _useSessionSetState2[1],
      setOverPayload = _useSessionSetState2[2];

  var _useSessionSetState3 = useSessionSetState("".concat(cacheKey, "_FETCH_EXTRA"), initExtraData, {
    disable: !isCache
  }),
      _useSessionSetState4 = _slicedToArray(_useSessionSetState3, 2),
      extraData = _useSessionSetState4[0],
      setExtraData = _useSessionSetState4[1];
  /* 常用关联值存一个state减少更新 */


  var _useSessionSetState5 = useSessionSetState("".concat(cacheKey, "_FETCH_STATES"), {
    data: initData instanceof Function ? initData() : initData,
    loading: false,
    error: undefined,
    timeout: false
  }, {
    disable: !isCache
  }),
      _useSessionSetState6 = _slicedToArray(_useSessionSetState5, 2),
      state = _useSessionSetState6[0],
      setState = _useSessionSetState6[1];
  /* 轮询处理 */


  useEffect(function intervalHandle() {
    var timer;

    if (pollingInterval && pollingInterval > 500) {
      timer = window.setInterval(function () {
        var now = Date.now();
        var last = self.lastFetch;
        var reFetch = now - last >= pollingInterval;
        reFetch && _update();
      }, pollingInterval);
    }

    return function () {
      timer && clearInterval(timer);
    }; // eslint-disable-next-line
  }, [pollingInterval]);
  /* 将inputs改变标记为isUpdate */

  useEffect(function flagUpdate() {
    if (!isInit) {
      self.isUpdate = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, _toConsumableArray(inputs));
  useEffect(function fetchHandle() {
    var ignore = false;
    var timer;
    var _isUpdate = self.isUpdate;
    self.isUpdate = false; // 初始化时，如果isPost则跳过

    if (isInit && isPost) {
      return;
    }

    function fetcher() {
      return _fetcher.apply(this, arguments);
    }

    function _fetcher() {
      _fetcher = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setState(_objectSpread$2({}, getResetState('loading', true)));
                self.lastFetch = Date.now();
                timer = setTimeout(function () {
                  ignore = true;
                  onTimeout();
                  setState(_objectSpread$2({}, getResetState('timeout', true)));
                }, timeout);
                _context.prev = 3;
                _context.next = 6;
                return method(payload);

              case 6:
                response = _context.sent;

                if (!ignore) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                setState(_objectSpread$2({}, getResetState('data', response)));
                onSuccess(response, _isUpdate);
                _context.next = 19;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](3);

                if (!ignore) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return");

              case 17:
                setState(_objectSpread$2({}, getResetState('error', _context.t0)));
                onError(_context.t0);

              case 19:
                _context.prev = 19;
                !ignore && onComplete();
                clearTimeout(timer);
                return _context.finish(19);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 13, 19, 23]]);
      }));
      return _fetcher.apply(this, arguments);
    }

    if (isPass) {
      fetcher().then();
    } else {
      self.isUpdate = false;
    }

    return function () {
      ignore = true;
      timer && clearTimeout(timer);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, isPass, force].concat(_toConsumableArray(inputs)));
  /* 返回一个将互斥的状态还原的对象，并通过键值设置某个值 */

  function getResetState(key, value) {
    return _defineProperty({
      loading: false,
      error: undefined,
      timeout: false
    }, key, value);
  }

  var memoSetState = useCallback(_setState, [setState]);

  function _setState(patch) {
    setState(function (_ref2) {
      var data = _ref2.data;

      var _patch = isFunction(patch) ? patch(data) : patch;

      return {
        data: _objectSpread$2({}, data, {}, _patch)
      };
    });
  }

  var update = useCallback(_update, [isPass]);

  function _update() {
    if (!isPass) return;
    self.isUpdate = true;
    forceUpdate(function (p) {
      return ++p;
    });
  }

  var send = useCallback(_send, [update]);

  function _send(_payload) {
    if (!isPass) return;
    _payload ? setOverPayload(_payload) : update();
  }

  return _objectSpread$2({}, state, {
    payload: payload,
    setPayload: setPayload,
    setOverPayload: setOverPayload,
    update: update,
    send: send,
    setData: memoSetState,
    extraData: extraData,
    setExtraData: setExtraData
  });
};

var eventStore = {};
/**
 * 触发一个自定义事件
 * eventKey: 事件名
 * payload: 参数
 * */

function customEventEmit(eventKey, payload) {
  var events = eventStore[eventKey];
  if (!events || !Array.isArray(events)) return;
  if (events.length === 0) return;
  events.forEach(function (event) {
    event.handle(payload);
  });
}
/**
 * 绑定一个自定义事件，可以在任意组件任意位置触发它, 每个事件可以多次绑定不同的处理函数
 * eventKey? - 事件名
 * handle? - 事件处理程序
 * inputs? - 依赖数组，默认会在每一次更新时替换handle，当handle中不依赖或部分依赖其他状态时，可通过此项指定(!不要通过inputs传入未memo的引用对象!)
 * */

function useCustomEvent(eventKey, handle, inputs) {
  var flag = useRef(Math.random()); // 防止重复添加

  var key = eventKey;
  useEffect(function () {
    if (key && handle) {
      if (!Array.isArray(eventStore[key])) {
        eventStore[key] = [];
      }

      var existInd = eventStore[key].findIndex(function (item) {
        return item.flag === flag.current;
      });
      var nowEvent = {
        handle: handle,
        flag: flag.current
      }; // 事件存在时覆盖原有事件

      if (existInd !== -1) {
        eventStore[key][existInd] = nowEvent;
      } else {
        eventStore[key].push(nowEvent);
      }
    } // 移除事件


    return function () {
      var events = eventStore[key];
      if (!key || !handle || !events) return;
      if (events.length === 0) return; // eslint-disable-next-line react-hooks/exhaustive-deps

      var index = events.findIndex(function (item) {
        return item.flag === flag.current;
      });
      eventStore[key].splice(index, 1);
    }; // eslint-disable-next-line
  }, inputs || [handle, key]);
  return customEventEmit;
}

var useBreakPointBase = createBreakpoint({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
});

var useBreakPoint = function useBreakPoint() {
  var bp = useBreakPointBase();
  return {
    xs: bp === 'xs',
    sm: bp === 'sm',
    md: bp === 'md',
    lg: bp === 'lg',
    xl: bp === 'xl',
    xxl: bp === 'xxl'
  };
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var VALUE = 'value';
var DEFAULT_VALUE = 'defaultValue';
var TRIGGER = 'onChange';
/**
 * 当useFormState传入props的key与预设的不一致时，通过此函数进行映射
 * @param props - 透传给useFormState
 * @param maps - 将props中的指定key映射为value、defaultValue、onChange
 *
 * 只有当props包含map中指定的参数时，代理才会生效
 * */

function formStateMap(props, _ref) {
  var value = _ref.value,
      defaultValue = _ref.defaultValue,
      trigger = _ref.trigger;

  var _props = _objectSpread$3({}, props);

  if (value && value in props) {
    _props[VALUE] = props[value];
  }

  if (defaultValue && defaultValue in props) {
    _props[DEFAULT_VALUE] = props[defaultValue];
  }

  if (trigger && trigger in props) {
    _props[TRIGGER] = props[trigger];
  }

  return _props;
}
/**
 * 快捷的实现统一接口的受控、非受控组件
 * @param props - 透传消费组件的props，该组件需要实现FormLike接口或通过formStateMap定制key
 * @param defaultValue - 默认值，会被value与defaultValue覆盖
 * @interface <T> - value的类型
 * @interface <Ext> - onChange接收的额外参数的类型
 * @returns [state, setFormState] - 表单状态与更新表单状态的方法，接口与useState相似
 * */

function useFormState(props, defaultValue) {
  var value = props.value,
      onChange = props.onChange,
      propDefaultValue = props.defaultValue; // 用于在一些特定的位置能立即获取到state

  var stateRef = useRef(); // 设置表单状态

  var _useState = useState(function () {
    // 初始状态获取说明: value > defaultValue > useFormState中配置的defaultValue
    var val = defaultValue;

    if (VALUE in props) {
      val = value;
    }

    if (DEFAULT_VALUE in props) {
      val = propDefaultValue;
    }

    return stateRef.current = val;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
  /* 为受控组件同步状态 */


  useUpdateEffect(function () {
    if (VALUE in props) {
      // 如果两次值显式相等则跳过
      value !== stateRef.current && setState(stateRef.current = value);
    }
  }, [value]);
  /* 处理修改表单值 */

  var setFormState = function setFormState(patch, extra) {
    /* 是受控组件则将新值通过onChange回传即可，非受控组件设置本地状态并通过onChange通知 */
    var hasValue = VALUE in props;

    if (isFunction(patch)) {
      if (!hasValue) {
        setState(function (prev) {
          var patchResult = patch(prev);
          onChange && onChange(patchResult, extra);
          return patchResult;
        });
      } else {
        var patchResult = patch(stateRef.current);
        onChange && onChange(patchResult, extra);
      }
    } else {
      onChange && onChange(patch, extra);

      if (!hasValue) {
        setState(patch);
      }
    }
  };

  return [state, setFormState];
}

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * 用于便捷的获取或设置react-router v5的query string
 * @interface <Query> - any | 查询对象的接口格式
 * @return result
 * @return result.search - 原始查询字符串
 * @return result.queryObject - 根据search解析得到的对象
 * @return result.set - 将包含一个或多个查询值的对象覆盖到当前url查询上
 * @return result.coverSet - 同set，区别是会重置掉所有search并设置为传入的查询对象
 * */

function useQuery() {
  var _useHistory = useHistory(),
      replace = _useHistory.replace;

  var _useLocation = useLocation(),
      search = _useLocation.search,
      pathname = _useLocation.pathname,
      hash = _useLocation.hash;

  var queryObject = qs.parse(search);

  function navWidthNewSearch(newQO) {
    replace("".concat(pathname, "?").concat(qs.stringify(newQO)).concat(hash));
  }

  var set = useCallback(function (queryItem) {
    var newQueryObject = _objectSpread$4({}, queryObject, {}, queryItem);

    navWidthNewSearch(newQueryObject); // eslint-disable-next-line
  }, [search]);
  var coverSet = useCallback(function (queryItem) {
    navWidthNewSearch(queryItem); // eslint-disable-next-line
  }, [search]);
  return {
    search: search,
    queryObject: queryObject,
    set: set,
    coverSet: coverSet
  };
}

export { customEventEmit, formStateMap, useBreakPoint, useCustomEvent, useFetch, useFormState, useIsInitMount, useQuery, useSelf, useSetState, useSyncState };
