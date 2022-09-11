(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useStorageSetState = {}, global.slicedToArrayMjs, global.react, global.hooks);
})(this, function(exports, _slicedToArray, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useStorageSetState", {
        enumerable: true,
        get: function() {
            return useStorageSetState;
        }
    });
    _slicedToArray = _slicedToArray.default;
    var useStorageSetState = function(/** 缓存key */ key) {
        var /** 初始状态 */ initState = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, /** 其他选项 */ options = arguments.length > 2 ? arguments[2] : void 0;
        var ref = _slicedToArray((0, _react.useState)(0), 2), update = ref[1];
        var ref1 = _slicedToArray((0, _hooks.useStorageState)(key, initState, options), 2), state = ref1[0], set = ref1[1];
        var setState = (0, _react.useCallback)(function(patch) {
            // 关键是使用Object.assign保证引用不变
            set(Object.assign(state, patch instanceof Function ? patch(state) : patch));
            // 引用相同useState是不会更新的，需要手动触发更新
            update(function(prev) {
                return prev + 1;
            });
        }, [
            set
        ]);
        return [
            state,
            setState
        ];
    };
});
