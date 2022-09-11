(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/hooks"), require("@m78/utils"), require("lodash/isEqual"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/hooks",
        "@m78/utils",
        "lodash/isEqual"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useFormState = {}, global.interopRequireDefaultMjs, global.slicedToArrayMjs, global.react, global.hooks, global.utils, global.isEqual);
})(this, function(exports, _interopRequireDefault, _slicedToArray, _react, _hooks, _utils, _isEqual) {
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
        useFormState: function() {
            return useFormState;
        },
        useControllableValue: function() {
            return useFormState;
        }
    });
    _interopRequireDefault = _interopRequireDefault.default;
    _slicedToArray = _slicedToArray.default;
    _isEqual = /*#__PURE__*/ _interopRequireDefault(_isEqual);
    function useFormState(/** 透传消费组件的props，该组件需要实现FormLike接口 */ props, /** 默认值，会被value与defaultValue覆盖 */ defaultValue, /** 其他配置 */ config) {
        var ref = config || {}, _valueKey = ref.valueKey, valueKey = _valueKey === void 0 ? "value" : _valueKey, _defaultValueKey = ref.defaultValueKey, defaultValueKey = _defaultValueKey === void 0 ? "defaultValue" : _defaultValueKey, _triggerKey = ref.triggerKey, triggerKey = _triggerKey === void 0 ? "onChange" : _triggerKey, deep = ref.deep;
        var value = props[valueKey], onChange = props[triggerKey], propDefaultValue = props[defaultValueKey];
        // 用于在一些特定的位置能立即获取到`state
        var stateRef = (0, _react.useRef)();
        // 设置表单状态
        var ref1 = _slicedToArray((0, _react.useState)(function() {
            // 初始状态获取说明: value > defaultValue > useFormState中配置的defaultValue
            var val = defaultValue;
            if (valueKey in props) {
                val = props[valueKey] === undefined ? defaultValue : value;
            }
            if (defaultValueKey in props) {
                val = props[defaultValueKey] === undefined ? defaultValue : propDefaultValue;
            }
            return stateRef.current = val;
        }), 2), state = ref1[0], setState = ref1[1];
        /* 为受控组件同步状态 */ (0, _hooks.useUpdateEffect)(function() {
            if (valueKey in props) {
                if (deep) {
                    !(0, _isEqual.default)(value, stateRef.current) && setState(stateRef.current = value);
                } else {
                    value !== stateRef.current && setState(stateRef.current = value);
                }
            }
        }, [
            value
        ]);
        /* 处理修改表单值 */ var setFormState = function(patch, extra) {
            /* 是受控组件则将新值通过onChange回传即可，非受控组件设置本地状态并通过onChange通知 */ var hasValue = valueKey in props;
            if ((0, _utils.isFunction)(patch)) {
                if (!hasValue) {
                    setState(function(prev) {
                        var patchResult = patch(prev);
                        (0, _utils.defer)(function() {
                            onChange && onChange(patchResult, extra);
                        });
                        return patchResult;
                    });
                } else {
                    var patchResult = patch(stateRef.current);
                    onChange && onChange(patchResult, extra);
                }
            } else {
                onChange && onChange(patch, extra);
                if (!hasValue) {
                    setState(patch);
                }
            }
        };
        return [
            state,
            setFormState
        ];
    }
});
