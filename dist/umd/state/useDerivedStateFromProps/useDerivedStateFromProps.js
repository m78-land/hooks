(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"), require("lodash/isEqualWith"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks",
        "lodash/isEqualWith"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useDerivedStateFromProps = {}, global.interopRequireDefaultMjs, global.slicedToArrayMjs, global.react, global.hooks, global.isEqualWith);
})(this, function(exports, _interopRequireDefault, _slicedToArray, _react, _hooks, _isEqualWith) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useDerivedStateFromProps", {
        enumerable: true,
        get: function() {
            return useDerivedStateFromProps;
        }
    });
    _interopRequireDefault = _interopRequireDefault.default;
    _slicedToArray = _slicedToArray.default;
    _isEqualWith = /*#__PURE__*/ _interopRequireDefault(_isEqualWith);
    function useDerivedStateFromProps(prop, customizer) {
        var ref = _slicedToArray((0, _react.useState)(prop), 2), state = ref[0], setState = ref[1];
        (0, _hooks.useUpdateEffect)(function() {
            var isEqual = (0, _isEqualWith.default)(prop, state, customizer);
            if (!isEqual) {
                setState(prop);
            }
        }, [
            prop
        ]);
        return [
            state,
            setState
        ];
    }
});
