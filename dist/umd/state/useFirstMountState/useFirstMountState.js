(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useFirstMountState = {}, global.react);
})(this, function(exports, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useFirstMountState", {
        enumerable: true,
        get: function() {
            return useFirstMountState;
        }
    });
    function useFirstMountState() {
        var r = (0, _react.useRef)(0);
        (0, _react.useEffect)(function() {
            r.current += 1;
        }, []);
        return r.current === 0;
    }
});
