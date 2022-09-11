(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useToggle = {}, global.slicedToArrayMjs, global.react, global.hooks);
})(this, function(exports, _slicedToArray, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useToggle", {
        enumerable: true,
        get: function() {
            return useToggle;
        }
    });
    _slicedToArray = _slicedToArray.default;
    function useToggle() {
        var init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        var ref = _slicedToArray((0, _react.useState)(init), 2), toggle = ref[0], set = ref[1];
        var s = (0, _hooks.useFn)(function(next) {
            if (next !== undefined) {
                set(next);
                return;
            }
            set(function(prev) {
                return !prev;
            });
        });
        return [
            toggle,
            s
        ];
    }
});
