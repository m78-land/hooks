(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_export_star.mjs"), require("./app.d"), require("./effect/useEvent/useEvent"), require("./effect/useDebounce/useDebounce"), require("./effect/useEffectEqual/useEffectEqual"), require("./effect/useFetch/useFetch"), require("./effect/useFn/useFn"), require("./effect/useThrottle/useThrottle"), require("./effect/useUpdateEffect/useUpdateEffect"), require("./effect/useUpdate/useUpdate"), require("./state/useDerivedStateFromProps/useDerivedStateFromProps"), require("./state/useFormState/useFormState"), require("./state/useRefize/useRefize"), require("./state/useSame/useSame"), require("./state/useSelf/useSelf"), require("./state/useSetState/useSetState"), require("./state/useStorageState/useStorageSetState"), require("./state/useStorageState/useStorageState"), require("./state/useQueue/useQueue"), require("./state/usePrev/usePrev"), require("./state/useToggle/useToggle"), require("./state/useDelayToggle/useDelayToggle"), require("./state/useMountState/useMountState"), require("./state/useFirstMountState/useFirstMountState"), require("./state/useIsUnmountState/useIsUnmountState"), require("./ui/useLockBodyScroll/useLockBodyScroll"), require("./ui/useScroll/useScroll"), require("./ui/useCheck/useCheck"), require("./ui/useMeasure/useMeasure"), require("./ui/useVirtualList/useVirtualList"), require("./ui/useClickAway/useClickAway"), require("./utils/utils"), require("./type"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_export_star.mjs",
        "./app.d",
        "./effect/useEvent/useEvent",
        "./effect/useDebounce/useDebounce",
        "./effect/useEffectEqual/useEffectEqual",
        "./effect/useFetch/useFetch",
        "./effect/useFn/useFn",
        "./effect/useThrottle/useThrottle",
        "./effect/useUpdateEffect/useUpdateEffect",
        "./effect/useUpdate/useUpdate",
        "./state/useDerivedStateFromProps/useDerivedStateFromProps",
        "./state/useFormState/useFormState",
        "./state/useRefize/useRefize",
        "./state/useSame/useSame",
        "./state/useSelf/useSelf",
        "./state/useSetState/useSetState",
        "./state/useStorageState/useStorageSetState",
        "./state/useStorageState/useStorageState",
        "./state/useQueue/useQueue",
        "./state/usePrev/usePrev",
        "./state/useToggle/useToggle",
        "./state/useDelayToggle/useDelayToggle",
        "./state/useMountState/useMountState",
        "./state/useFirstMountState/useFirstMountState",
        "./state/useIsUnmountState/useIsUnmountState",
        "./ui/useLockBodyScroll/useLockBodyScroll",
        "./ui/useScroll/useScroll",
        "./ui/useCheck/useCheck",
        "./ui/useMeasure/useMeasure",
        "./ui/useVirtualList/useVirtualList",
        "./ui/useClickAway/useClickAway",
        "./utils/utils",
        "./type"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.exportStarMjs, global.appD, global.useEvent, global.useDebounce, global.useEffectEqual, global.useFetch, global.useFn, global.useThrottle, global.useUpdateEffect, global.useUpdate, global.useDerivedStateFromProps, global.useFormState, global.useRefize, global.useSame, global.useSelf, global.useSetState, global.useStorageSetState, global.useStorageState, global.useQueue, global.usePrev, global.useToggle, global.useDelayToggle, global.useMountState, global.useFirstMountState, global.useIsUnmountState, global.useLockBodyScroll, global.useScroll, global.useCheck, global.useMeasure, global.useVirtualList, global.useClickAway, global.utils, global.type);
})(this, function(exports, _exportStar, _appD, _useEvent, _useDebounce, _useEffectEqual, _useFetch, _useFn, _useThrottle, _useUpdateEffect, _useUpdate, _useDerivedStateFromProps, _useFormState, _useRefize, _useSame, _useSelf, _useSetState, _useStorageSetState, _useStorageState, _useQueue, _usePrev, _useToggle, _useDelayToggle, _useMountState, _useFirstMountState, _useIsUnmountState, _useLockBodyScroll, _useScroll, _useCheck, _useMeasure, _useVirtualList, _useClickAway, _utils, _type) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _exportStar = _exportStar.default;
    _exportStar(_useEvent, exports);
    _exportStar(_useDebounce, exports);
    _exportStar(_useEffectEqual, exports);
    _exportStar(_useFetch, exports);
    _exportStar(_useFn, exports);
    _exportStar(_useThrottle, exports);
    _exportStar(_useUpdateEffect, exports);
    _exportStar(_useUpdate, exports);
    _exportStar(_useDerivedStateFromProps, exports);
    _exportStar(_useFormState, exports);
    _exportStar(_useRefize, exports);
    _exportStar(_useSame, exports);
    _exportStar(_useSelf, exports);
    _exportStar(_useSetState, exports);
    _exportStar(_useStorageSetState, exports);
    _exportStar(_useStorageState, exports);
    _exportStar(_useQueue, exports);
    _exportStar(_usePrev, exports);
    _exportStar(_useToggle, exports);
    _exportStar(_useDelayToggle, exports);
    _exportStar(_useMountState, exports);
    _exportStar(_useFirstMountState, exports);
    _exportStar(_useIsUnmountState, exports);
    _exportStar(_useLockBodyScroll, exports);
    _exportStar(_useScroll, exports);
    _exportStar(_useCheck, exports);
    _exportStar(_useMeasure, exports);
    _exportStar(_useVirtualList, exports);
    _exportStar(_useClickAway, exports);
    _exportStar(_utils, exports);
    _exportStar(_type, exports);
});
