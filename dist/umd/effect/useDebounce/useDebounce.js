(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_to_consumable_array.mjs"), require("react"), require("@m78/utils"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "react",
        "@m78/utils",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useDebounce = {}, global.toConsumableArrayMjs, global.react, global.utils, global.hooks);
})(this, function(exports, _toConsumableArray, _react, _utils, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useDebounce", {
        enumerable: true,
        get: function() {
            return useDebounce;
        }
    });
    _toConsumableArray = _toConsumableArray.default;
    function useDebounce(fn) {
        var wait = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 300;
        var self1 = (0, _hooks.useSelf)({
            timer: undefined
        });
        var cancel = (0, _hooks.useFn)(function() {
            if (self1.timer) {
                _utils["__GLOBAL__"].clearTimeout(self1.timer);
            }
        });
        (0, _react.useEffect)(function() {
            return cancel;
        });
        var memoFn = (0, _hooks.useFn)(function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            cancel();
            self1.timer = _utils["__GLOBAL__"].setTimeout(function() {
                fn.apply(void 0, _toConsumableArray(args));
                _utils["__GLOBAL__"].clearTimeout(self1.timer);
            }, wait);
        });
        var bundle = Object.assign(memoFn, {
            cancel: cancel
        });
        return bundle;
    }
});
