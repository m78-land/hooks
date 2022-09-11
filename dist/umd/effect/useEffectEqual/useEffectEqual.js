(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_interop_require_wildcard.mjs"), require("react"), require("@m78/hooks"), require("lodash/isEqualWith"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_interop_require_wildcard.mjs",
        "react",
        "@m78/hooks",
        "lodash/isEqualWith"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useEffectEqual = {}, global.interopRequireDefaultMjs, global.interopRequireWildcardMjs, global.react, global.hooks, global.isEqualWith);
})(this, function(exports, _interopRequireDefault, _interopRequireWildcard, _react, _hooks, _isEqualWith) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useEffectEqual", {
        enumerable: true,
        get: function() {
            return useEffectEqual;
        }
    });
    _interopRequireDefault = _interopRequireDefault.default;
    _interopRequireWildcard = _interopRequireWildcard.default;
    _react = /*#__PURE__*/ _interopRequireWildcard(_react);
    _isEqualWith = /*#__PURE__*/ _interopRequireDefault(_isEqualWith);
    function useEffectEqual(effect, deps, customizer) {
        var prev = (0, _hooks.usePrev)(deps);
        var dep = (0, _react.useRef)(0);
        var isEqual = (0, _react.useMemo)(function() {
            return (0, _isEqualWith.default)(deps, prev, customizer);
        }, [
            deps
        ]);
        if (!isEqual) {
            dep.current++;
        }
        (0, _react.useEffect)(effect, [
            dep.current
        ]);
    }
});
