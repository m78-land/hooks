(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("resize-observer-polyfill"), require("lodash/debounce"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "resize-observer-polyfill",
        "lodash/debounce",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useMeasure = {}, global.interopRequireDefaultMjs, global.slicedToArrayMjs, global.react, global.resizeObserverPolyfill, global.debounce, global.hooks);
})(this, function(exports, _interopRequireDefault, _slicedToArray, _react, _resizeObserverPolyfill, _debounce, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useMeasure", {
        enumerable: true,
        get: function() {
            return useMeasure;
        }
    });
    _interopRequireDefault = _interopRequireDefault.default;
    _slicedToArray = _slicedToArray.default;
    _resizeObserverPolyfill = /*#__PURE__*/ _interopRequireDefault(_resizeObserverPolyfill);
    _debounce = /*#__PURE__*/ _interopRequireDefault(_debounce);
    function useMeasure(target, debounceDelay) {
        var getEl = function getEl() {
            var el = (0, _hooks.getRefDomOrDom)(target);
            if (el) return el;
            return ref.current;
        };
        var ref = (0, _react.useRef)(null);
        var isUnmount = (0, _hooks.useIsUnmountState)();
        var ref1 = _slicedToArray((0, _react.useState)({
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            right: 0,
            bottom: 0,
            offsetHeight: 0,
            offsetWidth: 0
        }), 2), bounds = ref1[0], set = ref1[1];
        var cb = (0, _hooks.useFn)(function(param) {
            var _param = _slicedToArray(param, 1), entry = _param[0];
            var rect = entry.contentRect;
            !isUnmount() && set({
                // rect属性不可遍历, 所以这里用蠢一点的办法逐个复制
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                x: rect.x,
                y: rect.y,
                right: rect.right,
                bottom: rect.bottom,
                offsetHeight: entry.target.offsetHeight,
                offsetWidth: entry.target.offsetWidth
            });
        }, function(fn) {
            if (debounceDelay) {
                return (0, _debounce.default)(fn, debounceDelay);
            }
            return fn;
        }, [
            debounceDelay
        ]);
        var ref2 = _slicedToArray((0, _react.useState)(function() {
            return new _resizeObserverPolyfill.default(cb);
        }), 1), ro = ref2[0];
        (0, _react.useEffect)(function() {
            var el = getEl();
            if (el) ro.observe(el);
            return function() {
                return ro.disconnect();
            };
        }, []);
        return [
            bounds,
            ref
        ];
    }
});
