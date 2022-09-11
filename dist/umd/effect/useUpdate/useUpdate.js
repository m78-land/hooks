(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useUpdate = {}, global.slicedToArrayMjs, global.react, global.hooks);
})(this, function(exports, _slicedToArray, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useUpdate", {
        enumerable: true,
        get: function() {
            return useUpdate;
        }
    });
    _slicedToArray = _slicedToArray.default;
    var useUpdate = function() {
        var nextTickCall = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        var ref = _slicedToArray((0, _react.useState)(0), 2), setCount = ref[1];
        var timerRef = (0, _react.useRef)();
        var nextTickUpdate = (0, _hooks.useFn)(function() {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(function() {
                setCount(function(prev) {
                    return prev + 1;
                });
            });
        });
        var update = (0, _hooks.useFn)(function() {
            return setCount(function(prev) {
                return prev + 1;
            });
        });
        return nextTickCall ? nextTickUpdate : update;
    };
});
