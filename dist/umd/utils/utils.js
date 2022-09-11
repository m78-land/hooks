(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@m78/utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@m78/utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.utils = {}, global.utils);
})(this, function(exports, _utils) {
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
        getRefDomOrDom: function() {
            return getRefDomOrDom;
        },
        getTargetDomList: function() {
            return getTargetDomList;
        }
    });
    function getRefDomOrDom(target, ref) {
        if ((0, _utils.isDom)(target)) return target;
        if (target && (0, _utils.isDom)(target.current)) return target.current;
        if (ref && (0, _utils.isDom)(ref.current)) return ref.current;
        return undefined;
    }
    function getTargetDomList(target, ref) {
        if (target) {
            var targetList = (0, _utils.isArray)(target) ? target : [
                target
            ];
            var ls = targetList.map(function(item) {
                return getRefDomOrDom(item);
            }).filter(function(item) {
                return !!item;
            });
            if (ls.length) return ls;
        }
        var dom = getRefDomOrDom(ref);
        if (dom) return [
            dom
        ];
    }
});
