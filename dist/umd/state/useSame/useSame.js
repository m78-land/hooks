(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("@swc/helpers/src/_to_consumable_array.mjs"), require("react"), require("@m78/utils"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "react",
        "@m78/utils",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useSame = {}, global.objectSpreadMjs, global.slicedToArrayMjs, global.toConsumableArrayMjs, global.react, global.utils, global.hooks);
})(this, function(exports, _objectSpread, _slicedToArray, _toConsumableArray, _react, _utils, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useSame", {
        enumerable: true,
        get: function() {
            return useSame;
        }
    });
    _objectSpread = _objectSpread.default;
    _slicedToArray = _slicedToArray.default;
    _toConsumableArray = _toConsumableArray.default;
    /** 所有共享数据 */ var sameMap = {};
    /** 所有事件对象 */ var events = {};
    var defaultConfig = {
        deps: [],
        enable: true,
        updateDisabled: false
    };
    /** 递增值, 用于存储组件第一次挂载的时间点 */ var increment = 0;
    /** 以指定key获取事件对象，不存在时创建并返回 */ function getEvent(key) {
        var e = events[key];
        if (e) return e;
        events[key] = (0, _hooks.createEvent)();
        return events[key];
    }
    function useSame(key, config) {
        var get = /** 获取过滤掉非enable项的所有item, 当前index和id */ function get() {
            var ref = _slicedToArray(getCurrent(), 1), current = ref[0];
            var filter = current.filter(function(item) {
                return item.enable;
            });
            var index = filter.findIndex(function(item) {
                return item.id === id;
            });
            return [
                index,
                filter,
                id
            ];
        };
        var getCurrent = /** 获取当前组件在sameMap中的实例组和该组件在实例中的索引并确保sameMap[key]存在 */ function getCurrent() {
            // 无实例存在时赋初始值
            if (!(0, _utils.isArray)(sameMap[key])) {
                sameMap[key] = [];
            }
            var index = sameMap[key].findIndex(function(item) {
                return item.id === id;
            });
            return [
                sameMap[key],
                index
            ];
        };
        var setCurrentState = /* 设置当前实例的状态 */ function setCurrentState(_enable, _meta) {
            var ref = _slicedToArray(getCurrent(), 2), current = ref[0], index = ref[1];
            if (index !== -1) {
                current[index].enable = _enable;
                current[index].meta = _meta;
            }
        };
        var conf = _objectSpread({}, defaultConfig, config);
        var id = (0, _react.useMemo)(function() {
            return (0, _utils.createRandString)(2);
        }, []);
        var sort = (0, _react.useMemo)(function() {
            return ++increment;
        }, []);
        /** 最后一次返回的信息, 用于对比验证是否需要更新 */ var lastReturn = (0, _react.useRef)();
        /* 在某个组件更新了sameMap后，需要通知其他相应的以最新状态更新组件 */ var update = (0, _hooks.useUpdate)(true);
        var ref = (0, _react.useMemo)(function() {
            return getEvent("".concat(key, "_same_custom_event"));
        }, []), emit = ref.emit, useEvent = ref.useEvent;
        (0, _react.useMemo)(function() {
            // 创建item
            var item = {
                id: id,
                sort: sort,
                meta: conf.meta || {},
                enable: conf.enable
            };
            var ref = _slicedToArray(getCurrent(), 1), current = ref[0];
            current.push(item);
            current.sort(function(a, b) {
                return a.sort - b.sort;
            });
        }, []);
        // 将最新状态实时设置到当前的item上
        (0, _react.useMemo)(function() {
            setCurrentState(conf.enable, conf.meta);
        }, [
            conf.meta,
            conf.enable
        ]);
        // cIndex变更时，通知其他钩子进行更新
        (0, _hooks.useUpdateEffect)(function() {
            return emit(id, true);
        }, _toConsumableArray(conf.deps));
        // enable变更时通知更新
        (0, _react.useEffect)(function() {
            if (conf.enable) emit(id);
            return function() {
                var ref = _slicedToArray(getCurrent(), 2), index = ref[1];
                index !== -1 && emit(id);
            };
        }, [
            conf.enable
        ]);
        // unmount时通知其他组件并移除当前项
        (0, _react.useEffect)(function() {
            return function() {
                // 卸载时移除item
                var ref = _slicedToArray(getCurrent(), 2), cur = ref[0], index = ref[1];
                if (index !== -1) {
                    var item = cur[index];
                    cur.splice(index, 1);
                    item.enable && emit(id);
                }
            };
        }, []);
        /** 接收组件更新通知 */ useEvent(function(_id, force) {
            // 触发更新的实例不更新
            if (_id === id) return;
            if (!conf.updateDisabled && !conf.enable) return;
            // 强制更新, 不添加额外条件, 主要目的是同步meta
            if (force) {
                update();
                return;
            }
            if (!lastReturn.current) return;
            var ref = _slicedToArray(get(), 2), index = ref[0], current = ref[1];
            var _current = _slicedToArray(lastReturn.current, 2), lastIndex = _current[0], lastCurrent = _current[1];
            if (index !== lastIndex || current.length !== lastCurrent.length) {
                update();
            }
        });
        var returns = get();
        lastReturn.current = [
            returns[0],
            _toConsumableArray(returns[1]),
            returns[2], 
        ];
        return returns;
    }
});
