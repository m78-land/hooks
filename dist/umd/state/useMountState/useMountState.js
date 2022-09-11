(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useMountState = {}, global.slicedToArrayMjs, global.react, global.hooks);
})(this, function(exports, _slicedToArray, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useMountState", {
        enumerable: true,
        get: function() {
            return useMountState;
        }
    });
    _slicedToArray = _slicedToArray.default;
    function useMountState(toggle) {
        var ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _mountOnEnter = ref.mountOnEnter, mountOnEnter = _mountOnEnter === void 0 ? true : _mountOnEnter, _unmountOnExit = ref.unmountOnExit, unmountOnExit = _unmountOnExit === void 0 ? false : _unmountOnExit;
        var monkeySet = function monkeySet(m) {
            // 需要挂载但未挂载时对其进行挂载
            if (m && !mount) {
                setMount(true);
                return;
            }
            // 需要离场卸载且收到卸载通知且当前已挂载
            if (unmountOnExit && !m && mount) {
                setMount(false);
            }
        };
        var ref1 = _slicedToArray((0, _react.useState)(function() {
            // mountOnEnter为false时，强制渲染, 否则取init
            if (!mountOnEnter) return true;
            return toggle;
        }), 2), mount = ref1[0], setMount = ref1[1];
        // 自动同步true状态, false状态因为可能存在动画等, 由用户手动触发
        (0, _react.useEffect)(function() {
            toggle && monkeySet(toggle);
        }, [
            toggle
        ]);
        var unmount = (0, _hooks.useFn)(function() {
            return monkeySet(false);
        });
        return [
            mount,
            unmount
        ];
    }
});
