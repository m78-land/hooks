(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@m78/hooks"), require("react"), require("@m78/utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@m78/hooks",
        "react",
        "@m78/utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useEvent = {}, global.hooks, global.react, global.utils);
})(this, function(exports, _hooks, _react, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        enhance: function() {
            return enhance;
        },
        createEvent: function() {
            return createEvent;
        }
    });
    function enhance(event) {
        var useEvent = function(listener) {
            var memoHandle = (0, _hooks.useFn)(listener);
            (0, _react.useEffect)(function() {
                event.on(memoHandle);
                return function() {
                    return event.off(memoHandle);
                };
            }, []);
        };
        return Object.assign(event, {
            useEvent: useEvent
        });
    }
    /**
 * 自定义事件，用于多个组件间或组件外进行通讯
 * */ function createEvent() {
        return enhance((0, _utils.createEvent)());
    }
    createEvent.enhance = enhance;
});
