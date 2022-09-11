(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_to_consumable_array.mjs"), require("react"), require("@m78/utils"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "react",
        "@m78/utils",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useClickAway = {}, global.toConsumableArrayMjs, global.react, global.utils, global.hooks);
})(this, function(exports, _toConsumableArray, _react, _utils, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useClickAway", {
        enumerable: true,
        get: function() {
            return useClickAway;
        }
    });
    _toConsumableArray = _toConsumableArray.default;
    var defaultEvents = [
        "mousedown",
        "touchstart"
    ];
    function useClickAway(param) {
        var target = param.target, _events = param.events, events = _events === void 0 ? defaultEvents : _events, onTrigger = param.onTrigger;
        var bindHelper = function bindHelper() {
            var isOff = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            events.forEach(function(eventKey) {
                document[isOff ? "removeEventListener" : "addEventListener"](eventKey, handle);
            });
        };
        var ref = (0, _react.useRef)();
        var domList = (0, _react.useRef)([]);
        var handle = (0, _hooks.useFn)(function(e) {
            if (!domList.current.length) return;
            var isInner = domList.current.some(function(dom) {
                return dom.contains(e.target);
            });
            !isInner && onTrigger(e);
        });
        var targetLs = (0, _react.useMemo)(function() {
            var r = ref;
            if (!target) return [
                r
            ];
            if (!(0, _utils.isArray)(target)) return [
                target,
                r
            ];
            return _toConsumableArray(target).concat([
                r
            ]);
        }, [
            target,
            ref.current
        ]);
        (0, _react.useEffect)(function() {
            domList.current = (0, _hooks.getTargetDomList)(targetLs) || [];
        }, targetLs);
        (0, _react.useEffect)(function() {
            bindHelper();
            return function() {
                return bindHelper(true);
            };
        }, events);
        return ref;
    }
});
