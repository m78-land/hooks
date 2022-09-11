(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useSetState = {}, global.objectSpreadMjs, global.slicedToArrayMjs, global.react);
})(this, function(exports, _objectSpread, _slicedToArray, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useSetState", {
        enumerable: true,
        get: function() {
            return useSetState;
        }
    });
    _objectSpread = _objectSpread.default;
    _slicedToArray = _slicedToArray.default;
    var useSetState = function() {
        var initState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var ref = _slicedToArray((0, _react.useState)(initState), 2), state = ref[0], set = ref[1];
        var ref1 = (0, _react.useRef)(state);
        var setState = (0, _react.useCallback)(function(patch) {
            var newState = _objectSpread({}, state, patch instanceof Function ? patch(ref1.current) : patch);
            ref1.current = Object.assign(ref1.current, newState);
            set(newState);
        }, [
            set
        ]);
        return [
            ref1.current,
            setState
        ];
    };
});
