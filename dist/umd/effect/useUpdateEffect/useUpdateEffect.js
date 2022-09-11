(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useUpdateEffect = {}, global.react, global.hooks);
})(this, function(exports, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useUpdateEffect", {
        enumerable: true,
        get: function() {
            return useUpdateEffect;
        }
    });
    var useUpdateEffect = function(effect, deps) {
        var isFirstMount = (0, _hooks.useFirstMountState)();
        (0, _react.useEffect)(function() {
            if (!isFirstMount) return effect();
        }, deps);
    };
});
