/**
 * 将转入的开关状态在指定延迟后转为本地状态并在变更后同步
 * */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useDelayToggle = {}, global.slicedToArrayMjs, global.react, global.hooks);
})(this, function(exports, _slicedToArray, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useDelayToggle", {
        enumerable: true,
        get: function() {
            return useDelayToggle;
        }
    });
    _slicedToArray = _slicedToArray.default;
    function useDelayToggle(toggle) {
        var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 300, options = arguments.length > 2 ? arguments[2] : void 0;
        var ref = options || {}, disabled = ref.disabled, _leadingDelay = ref.leadingDelay, leadingDelay = _leadingDelay === void 0 ? delay : _leadingDelay, _trailingDelay = ref.trailingDelay, trailingDelay = _trailingDelay === void 0 ? delay : _trailingDelay, trailing = ref.trailing, _leading = ref.leading, leading = _leading === void 0 ? true : _leading;
        var isDisabled = !delay || disabled || !trailing && !leading;
        // 初始值在禁用或未开启前导延迟时为toggle本身，否则为false
        var ref1 = _slicedToArray((0, _react.useState)(toggle), 2), innerState = ref1[0], setInnerState = ref1[1];
        var self1 = (0, _hooks.useSelf)({
            toggleTimer: null
        });
        (0, _react.useEffect)(function() {
            if (isDisabled) return;
            if (toggle && !leading || !toggle && !trailing) {
                toggle !== innerState && setInnerState(toggle);
                return;
            }
            var d = toggle ? leadingDelay : trailingDelay;
            self1.toggleTimer = setTimeout(function() {
                setInnerState(toggle);
            }, d);
            return function() {
                self1.toggleTimer && clearTimeout(self1.toggleTimer);
            };
        }, [
            toggle
        ]);
        return isDisabled ? toggle : innerState;
    }
});
