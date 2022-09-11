(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.usePrev = {}, global.react);
})(this, function(exports, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "usePrev", {
        enumerable: true,
        get: function() {
            return usePrev;
        }
    });
    function usePrev(value) {
        var ref = (0, _react.useRef)();
        (0, _react.useEffect)(function() {
            return void (ref.current = value);
        }, [
            value
        ]);
        return ref.current;
    }
});
