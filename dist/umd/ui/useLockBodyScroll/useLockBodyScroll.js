(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@m78/utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@m78/utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useLockBodyScroll = {}, global.react, global.utils);
})(this, function(exports, _react, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useLockBodyScroll", {
        enumerable: true,
        get: function() {
            return useLockBodyScroll;
        }
    });
    var scrollPosition = 0; // 保存锁定时的滚动位置
    var list = [];
    var useLockBodyScroll = function(locked) {
        var lock = function lock() {
            var bodyEl = instance.current.bodyEl;
            // 不同浏览器会使用不同的根滚动，这里需要进行一下兼容
            var bodyScrollInfo = (0, _utils.hasScroll)(bodyEl);
            var docScrollInfo = (0, _utils.hasScroll)(document.documentElement);
            var hasX = bodyScrollInfo.x || docScrollInfo.x;
            var hasY = bodyScrollInfo.y || docScrollInfo.y;
            bodyEl.setAttribute("data-locked", "1");
            scrollPosition = window.pageYOffset;
            bodyEl.style.width = "100%";
            bodyEl.style.overflowY = hasY ? "scroll" : "hidden";
            bodyEl.style.overflowX = hasX ? "scroll" : "hidden";
            bodyEl.style.position = "fixed";
            bodyEl.style.top = "-".concat(scrollPosition, "px");
        };
        var unlock = function unlock() {
            var bodyEl = instance.current.bodyEl;
            bodyEl.setAttribute("data-locked", "0");
            bodyEl.style.width = "";
            bodyEl.style.overflowY = "";
            bodyEl.style.overflowX = "";
            bodyEl.style.position = "";
            bodyEl.style.top = "";
            window.scrollTo(0, scrollPosition);
        };
        var id = (0, _react.useMemo)(function() {
            return (0, _utils.createRandString)();
        }, []);
        var instance = (0, _react.useRef)({
            bodyEl: null
        });
        (0, _react.useEffect)(function() {
            instance.current.bodyEl = document.body;
        }, []);
        // 存取list
        (0, _react.useEffect)(function() {
            if (locked) {
                list.push(id);
                if (list.length === 1) lock();
            }
            return function() {
                if (!locked) return;
                var ind = list.indexOf(id);
                if (ind !== -1) list.splice(ind, 1);
                if (!list.length) unlock();
            };
        }, [
            locked
        ]);
    };
});
