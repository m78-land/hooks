import { __assign, __spreadArrays } from "tslib";
import { useEffect, useMemo, useRef } from 'react';
import { createRandString, isArray } from '@lxjx/utils';
import { createEvent, useUpdateEffect, useUpdate } from '@lxjx/hooks';
/** 所有共享数据 */
var sameMap = {};
/** 所有事件对象 */
var events = {};
var defaultConfig = {
    deps: [],
    enable: true,
    updateDisabled: false,
};
/** 递增值, 用于存储组件第一次挂载的时间点 */
var increment = 0;
/** 以指定key获取事件对象，不存在时创建并返回 */
function getEvent(key) {
    var e = events[key];
    if (e)
        return e;
    events[key] = createEvent();
    return events[key];
}
// 通过list来生成状态, 组件一直保持list为最新状态
/**
 * 用于对同组件的不同实例进行管理，获取其他已渲染组件的共享数据以及当前处在启用实例中的顺序
 *
 * `常见用例有`:
 * - 获取Modal等组件的实例关系，根据组件渲染顺序设置zIndex，隐藏多余的mask等
 * - 对于Drawer等组件，根据渲染顺序调整显示的层级
 * @param key - 标识该组件的唯一key
 * @param config - 额外配置
 * @param config.meta - 用于共享的组件源数据，可以在同组件的其他实例中获取到
 * @param config.deps - [] | 出于性能考虑, 只有index和instances变更才会通知其他组件更新, meta是不会通知的, 可以通过配置此项使deps任意一项变更后都通知其他组件
 * @param config.enable - true | 只有在enable的值为true时，该实例才算启用并被钩子接受, 通常为Modal等组件的toggle参数 * @return state - 同类型启用组件共享的状态
 * @param config.updateDisabled - false | 发生变更时, 是否通知enable为false的组件更新
 * @return state[0] index - 该组件实例处于所有实例中的第几位，未启用的组件返回-1
 * @return state[1] instances - 所有启用状态的组件<Item>组成的数组，正序
 * @return state[2] id - 该组件实例的唯一标识
 * */
export function useSame(key, config) {
    var conf = __assign(__assign({}, defaultConfig), config);
    var id = useMemo(function () { return createRandString(2); }, []);
    var sort = useMemo(function () { return ++increment; }, []);
    /** 最后一次返回的信息, 用于对比验证是否需要更新 */
    var lastReturn = useRef();
    /* 在某个组件更新了sameMap后，需要通知其他相应的以最新状态更新组件 */
    var update = useUpdate(true);
    var _a = useMemo(function () { return getEvent(key + "_same_custom_event"); }, []), emit = _a.emit, useEvent = _a.useEvent;
    useMemo(function () {
        // 创建item
        var item = {
            id: id,
            sort: sort,
            meta: conf.meta || {},
            enable: conf.enable,
        };
        var current = getCurrent()[0];
        current.push(item);
        current.sort(function (a, b) { return a.sort - b.sort; });
    }, []);
    // 将最新状态实时设置到当前的item上
    useMemo(function () {
        setCurrentState(conf.enable, conf.meta);
    }, [conf.meta, conf.enable]);
    // cIndex变更时，通知其他钩子进行更新
    useUpdateEffect(function () { return emit(id, true); }, __spreadArrays(conf.deps));
    // enable变更时通知更新
    useEffect(function () {
        if (conf.enable)
            emit(id);
        return function () {
            var _a = getCurrent(), index = _a[1];
            index !== -1 && emit(id);
        };
    }, [conf.enable]);
    // unmount时通知其他组件并移除当前项
    useEffect(function () {
        return function () {
            // 卸载时移除item
            var _a = getCurrent(), cur = _a[0], index = _a[1];
            if (index !== -1) {
                var item = cur[index];
                cur.splice(index, 1);
                item.enable && emit(id);
            }
        };
    }, []);
    /** 获取过滤掉非enable项的所有item, 当前index和id */
    function get() {
        var current = getCurrent()[0];
        var filter = current.filter(function (item) { return item.enable; });
        var index = filter.findIndex(function (item) { return item.id === id; });
        return [index, filter, id];
    }
    /** 获取当前组件在sameMap中的实例组和该组件在实例中的索引并确保sameMap[key]存在 */
    function getCurrent() {
        // 无实例存在时赋初始值
        if (!isArray(sameMap[key])) {
            sameMap[key] = [];
        }
        var index = sameMap[key].findIndex(function (item) { return item.id === id; });
        return [sameMap[key], index];
    }
    /** 接收组件更新通知 */
    useEvent(function (_id, force) {
        // 触发更新的实例不更新
        if (_id === id)
            return;
        if (!conf.updateDisabled && !conf.enable)
            return;
        // 强制更新, 不添加额外条件, 主要目的是同步meta
        if (force) {
            update();
            return;
        }
        if (!lastReturn.current)
            return;
        var _a = get(), index = _a[0], current = _a[1];
        var _b = lastReturn.current, lastIndex = _b[0], lastCurrent = _b[1];
        if (index !== lastIndex || current.length !== lastCurrent.length) {
            update();
        }
    });
    /* 设置当前实例的状态 */
    function setCurrentState(_enable, _meta) {
        var _a = getCurrent(), current = _a[0], index = _a[1];
        if (index !== -1) {
            current[index].enable = _enable;
            current[index].meta = _meta;
        }
    }
    var returns = get();
    lastReturn.current = [returns[0], __spreadArrays(returns[1]), returns[2]];
    return returns;
}
