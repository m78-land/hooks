(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useSelf = {}, global.react);
})(this, function(exports, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useSelf", {
        enumerable: true,
        get: function() {
            return useSelf;
        }
    });
    function useSelf() {
        var init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var self1 = (0, _react.useRef)(init);
        return self1.current;
    }
});
