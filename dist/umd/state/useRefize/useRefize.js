(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useRefize = {}, global.react);
})(this, function(exports, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useRefize", {
        enumerable: true,
        get: function() {
            return useRefize;
        }
    });
    function useRefize(refState) {
        var ref = (0, _react.useRef)({});
        ref.current = Object.assign(ref.current, refState);
        return ref.current;
    }
});
