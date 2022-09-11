(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_object_spread_props.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("@swc/helpers/src/_to_consumable_array.mjs"), require("@m78/utils"), require("@m78/hooks"), require("lodash/differenceBy"), require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_object_spread_props.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "@m78/utils",
        "@m78/hooks",
        "lodash/differenceBy",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useQueue = {}, global.interopRequireDefaultMjs, global.objectSpreadMjs, global.objectSpreadPropsMjs, global.slicedToArrayMjs, global.toConsumableArrayMjs, global.utils, global.hooks, global.differenceBy, global.react);
})(this, function(exports, _interopRequireDefault, _objectSpread, _objectSpreadProps, _slicedToArray, _toConsumableArray, _utils, _hooks, _differenceBy, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useQueue", {
        enumerable: true,
        get: function() {
            return useQueue;
        }
    });
    _interopRequireDefault = _interopRequireDefault.default;
    _objectSpread = _objectSpread.default;
    _objectSpreadProps = _objectSpreadProps.default;
    _slicedToArray = _slicedToArray.default;
    _toConsumableArray = _toConsumableArray.default;
    _differenceBy = /*#__PURE__*/ _interopRequireDefault(_differenceBy);
    /*
 * old[] <->  current  <-> list[]
 * */ function useQueue() {
        var ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, defaultItemOption = ref.defaultItemOption, _list = ref.list, list = _list === void 0 ? [] : _list, _defaultManual = ref.defaultManual, defaultManual = _defaultManual === void 0 ? false : _defaultManual, onChange = ref.onChange;
        var hasNext = /**
   * 指定id是否包含下一项, 不传id查当前项
   * */ function hasNext(id) {
            var ref;
            if (!id && !state.current) {
                return !!self1.list.length;
            }
            var _id = id || ((ref = state.current) === null || ref === void 0 ? void 0 : ref.id);
            if (!_id) return false;
            var all = getAllList();
            var ind = findIndexById(_id);
            return !!all[ind + 1];
        };
        var hasPrev = /**
   * 指定id是否包含上一项, 不传id查当前项
   * */ function hasPrev(id) {
            var _id = id;
            if (!_id && !state.current) return false;
            if (!_id) {
                var ref;
                _id = (ref = state.current) === null || ref === void 0 ? void 0 : ref.id;
            }
            var all = getAllList();
            var ind = findIndexById(_id);
            return !!all[ind - 1];
        };
        var findIndexById = /**
   * 查询指定id在列表中的索引
   * */ function findIndexById(id) {
            var all = getAllList();
            return all.findIndex(function(item) {
                return item.id === id;
            });
        };
        var getAllList = /**
   * 获取所有列表和当前项组成的数组, 历史和当前列表
   * */ function getAllList() {
            var _ls, _ls1;
            var ls = [];
            (_ls = ls).push.apply(_ls, _toConsumableArray(self1.oldList));
            if (state.current) {
                ls.push(state.current);
            }
            (_ls1 = ls).push.apply(_ls1, _toConsumableArray(self1.list));
            return ls;
        };
        var clearTimer = function clearTimer() {
            if (self1.timer) {
                clearTimeout(self1.timer);
                self1.timerSetTime = null;
            }
        };
        var self1 = (0, _hooks.useSelf)({
            /** 消息队列 */ list: [],
            /** 历史记录 */ oldList: [],
            /** 开启下一条的计时器 */ timer: null,
            /** 设置计时器的时间 */ timerSetTime: null,
            /** 暂停的时间 */ pauseTime: null
        });
        var ref1 = _slicedToArray((0, _hooks.useSetState)({
            /** 当前显示消息 */ current: null,
            /** 是否暂停 */ manual: defaultManual
        }), 2), state = ref1[0], setState = ref1[1];
        var update = (0, _hooks.useUpdate)();
        // 清理
        (0, _react.useEffect)(function() {
            return clearTimer;
        }, []);
        /**
   * next()的实现版本，支持参数
   * */ var nextIn = (0, _hooks.useFn)(function(isPrev) {
            clearTimer();
            var nextCurrent = self1.list[0] || null;
            // 将当前项添加到历史
            if (!isPrev && state.current) {
                self1.oldList.push(state.current);
            }
            if (!nextCurrent) {
                setState({
                    current: null
                });
                return;
            }
            // 移除新项
            self1.list.splice(0, 1);
            // self.oldList.push(...del);
            setState({
                current: nextCurrent
            });
            onChange === null || onChange === void 0 ? void 0 : onChange(nextCurrent);
            // 未暂停且配置了持续时间, 定时切换到下一条
            if ((0, _utils.isNumber)(nextCurrent.duration) && !state.manual) {
                self1.timer = setTimeout(nextIn, nextCurrent.duration);
                self1.timerSetTime = Date.now();
            }
            // 如果切换过，暂停时间就没意义了，将其清除
            self1.pauseTime = null;
        });
        /**
   * 切换到下一项
   * */ var next = (0, _hooks.useFn)(function() {
            return nextIn();
        });
        /**
   * 切换到上一项
   * */ var prev = (0, _hooks.useFn)(function() {
            var _list;
            var lastOldInd = self1.oldList.length - 1; // 最后一条是当前消息
            var old = self1.oldList.splice(lastOldInd, 1);
            if (!old.length) return;
            // 当前消息和上一条消息重新放回队列
            state.current && self1.list.unshift(state.current);
            (_list = self1.list).unshift.apply(_list, _toConsumableArray(old));
            nextIn(true);
        });
        /**
   * 推入一个或一组新项，如果当前没有选中项且非手动模式，自动执行next()
   * @param opt - 要添加的新项，可以是一个单独的项配置或配置数组
   * */ var push = (0, _hooks.useFn)(function(opt) {
            if ((0, _utils.isArray)(opt)) {
                var _list;
                var ls = opt.map(function(item) {
                    return _objectSpread(_objectSpreadProps(_objectSpread({}, defaultItemOption), {
                        id: (0, _utils.createRandString)()
                    }), item);
                });
                (_list = self1.list).push.apply(_list, _toConsumableArray(ls));
            } else {
                self1.list.push(_objectSpread(_objectSpreadProps(_objectSpread({}, defaultItemOption), {
                    id: (0, _utils.createRandString)()
                }), opt));
            }
            if (state.current || state.manual) update();
            else next();
        });
        /**
   * 跳转到指定id项，该项左侧所有项会被移到历史列表，右侧所有项会移到待执行列表
   * */ var jump = (0, _hooks.useFn)(function(id) {
            clearTimer();
            var all = getAllList();
            var cInd = findIndexById(id);
            var leftList = all.slice(0, cInd);
            var rightList = all.slice(cInd);
            self1.oldList = leftList;
            self1.list = rightList;
            setState({
                current: null
            });
            nextIn();
        });
        /** 完全移除指定id或一组id的项, 如果你要关闭当前消息，应当使用next而不是remove，因为此方法会破坏队列的完整性 */ var remove = (0, _hooks.useFn)(function(id) {
            var ids = (0, _utils.isArray)(id) ? id : [
                id
            ];
            if (!ids.length) return;
            var diffList = function(ls) {
                return (0, _differenceBy.default)(ls, ids.map(function(item) {
                    return {
                        id: item
                    };
                }), function(item) {
                    return item.id;
                });
            };
            self1.oldList = diffList(self1.oldList);
            self1.list = diffList(self1.list);
            if (state.current && ids.includes(state.current.id)) {
                setState({
                    current: null
                });
            } else {
                update();
            }
        });
        // 启动初始list
        (0, _react.useEffect)(function() {
            if (list.length) {
                push(list); // +执行next()
            }
        }, []);
        /**
   * 清空队列
   * */ var clear = (0, _hooks.useFn)(function() {
            self1.list = [];
            self1.oldList = [];
            self1.timer = null;
            self1.timerSetTime = null;
            self1.pauseTime = null;
            clearTimer();
            setState({
                current: null,
                manual: false
            });
        });
        /**
   * 从自动模式切换为启用手动模式，暂停所有计时器
   * */ var manual = (0, _hooks.useFn)(function() {
            if (state.manual) return;
            setState({
                manual: true
            });
            clearTimeout(self1.timer);
            self1.pauseTime = Date.now();
        });
        /**
   * 从手动模式切换为自动模式, 如果包含暂停的计时器，会从暂停位置重新开始
   * */ var auto = (0, _hooks.useFn)(function() {
            if (!state.manual) return;
            setState({
                manual: false
            });
            var c = state.current;
            // 如果当前有选中项，且包含计时器, 根据打断时间重新设置计时器
            if (c) {
                clearTimeout(self1.timer);
                // 包含必要参数，还原暂停时间
                if (self1.pauseTime && self1.timerSetTime) {
                    var spend = self1.pauseTime - self1.timerSetTime;
                    if ((0, _utils.isNumber)(c.duration) && (0, _utils.isNumber)(spend)) {
                        self1.timer = setTimeout(next, c.duration - spend);
                    }
                // 使用默认时间
                } else if ((0, _utils.isNumber)(c.duration)) {
                    self1.timer = setTimeout(next, c.duration);
                }
            } else {
                // 没有消息时重新启用队列
                next();
            }
            self1.pauseTime = null;
        });
        return {
            push: push,
            prev: prev,
            next: next,
            jump: jump,
            hasNext: hasNext,
            hasPrev: hasPrev,
            clear: clear,
            findIndexById: findIndexById,
            isManual: state.manual,
            current: state.current,
            auto: auto,
            manual: manual,
            list: getAllList(),
            leftList: self1.oldList,
            rightList: self1.list,
            index: state.current ? findIndexById(state.current.id) : null,
            remove: remove
        };
    }
});
