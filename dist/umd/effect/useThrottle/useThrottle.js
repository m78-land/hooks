(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_to_consumable_array.mjs"), require("react"), require("@m78/utils"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "react",
        "@m78/utils",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useThrottle = {}, global.objectSpreadMjs, global.toConsumableArrayMjs, global.react, global.utils, global.hooks);
})(this, function(exports, _objectSpread, _toConsumableArray, _react, _utils, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useThrottle", {
        enumerable: true,
        get: function() {
            return useThrottle;
        }
    });
    _objectSpread = _objectSpread.default;
    _toConsumableArray = _toConsumableArray.default;
    var defaultOption = {
        leading: true,
        trailing: true
    };
    function useThrottle(fn) {
        var wait = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 300, options = arguments.length > 2 ? arguments[2] : void 0;
        var self1 = (0, _hooks.useSelf)({
            last: 0,
            timer: undefined
        });
        var opt = _objectSpread({}, defaultOption, options);
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
            var now = Date.now();
            var diff = now - self1.last;
            cancel();
            if (diff > wait) {
                // last = 0 时视为初次调用
                if (opt.leading || self1.last !== 0) {
                    fn.apply(void 0, _toConsumableArray(args));
                }
                self1.last = now;
            } else if (opt.trailing) {
                self1.timer = _utils["__GLOBAL__"].setTimeout(function() {
                    fn.apply(void 0, _toConsumableArray(args));
                    self1.last = 0; // 标记下次调用为leading调用
                    _utils["__GLOBAL__"].clearTimeout(self1.timer);
                }, wait);
            }
        });
        var bundle = Object.assign(memoFn, {
            cancel: cancel
        });
        return bundle;
    }
});
