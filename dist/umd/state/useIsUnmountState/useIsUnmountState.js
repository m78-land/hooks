(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useIsUnmountState = {}, global.react, global.hooks);
})(this, function(exports, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useIsUnmountState", {
        enumerable: true,
        get: function() {
            return useIsUnmountState;
        }
    });
    function useIsUnmountState() {
        var ref = (0, _react.useRef)(false);
        (0, _react.useEffect)(function() {
            return function() {
                ref.current = true;
            };
        }, []);
        return (0, _hooks.useFn)(function() {
            return ref.current;
        });
    }
});
