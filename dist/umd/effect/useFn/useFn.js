(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useFn = {}, global.react);
})(this, function(exports, _react) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useFn", {
        enumerable: true,
        get: function() {
            return useFn;
        }
    });
    function useFn(fn, wrapper) {
        var deps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
        var wrapFn = function wrapFn() {
            function memoFn() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return fnRef.current.apply(this, args);
            }
            memoFnRef.current = wrapper ? wrapper(memoFn) : memoFn;
        };
        var fnRef = (0, _react.useRef)();
        var memoFnRef = (0, _react.useRef)(null);
        // 更新缓存fn
        (0, _react.useMemo)(function() {
            if (!memoFnRef.current) return;
            wrapFn();
        }, deps);
        // 初始化缓存fn
        if (!memoFnRef.current) wrapFn();
        (0, /** 兼容devtool，直接写fnRef.current会阻断更新 */ _react.useMemo)(function() {
            fnRef.current = fn;
        });
        return memoFnRef.current;
    }
});
