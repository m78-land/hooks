(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_async_to_generator.mjs"), require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_interop_require_wildcard.mjs"), require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_object_spread_props.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("@swc/helpers/src/_to_consumable_array.mjs"), require("@swc/helpers/src/_ts_generator.mjs"), require("@m78/utils"), require("lodash/debounce"), require("lodash/throttle"), require("react"), require("@m78/hooks"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_async_to_generator.mjs",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_interop_require_wildcard.mjs",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_object_spread_props.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "@swc/helpers/src/_ts_generator.mjs",
        "@m78/utils",
        "lodash/debounce",
        "lodash/throttle",
        "react",
        "@m78/hooks"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useFetch = {}, global.asyncToGeneratorMjs, global.interopRequireDefaultMjs, global.interopRequireWildcardMjs, global.objectSpreadMjs, global.objectSpreadPropsMjs, global.slicedToArrayMjs, global.toConsumableArrayMjs, global.tsGeneratorMjs, global.utils, global.debounce, global.throttle, global.react, global.hooks);
})(this, function(exports, _asyncToGenerator, _interopRequireDefault, _interopRequireWildcard, _objectSpread, _objectSpreadProps, _slicedToArray, _toConsumableArray, _tsGenerator, _utils, _debounce, _throttle, _react, _hooks) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useFetch", {
        enumerable: true,
        get: function() {
            return useFetch;
        }
    });
    _asyncToGenerator = _asyncToGenerator.default;
    _interopRequireDefault = _interopRequireDefault.default;
    _interopRequireWildcard = _interopRequireWildcard.default;
    _objectSpread = _objectSpread.default;
    _objectSpreadProps = _objectSpreadProps.default;
    _slicedToArray = _slicedToArray.default;
    _toConsumableArray = _toConsumableArray.default;
    _tsGenerator = _tsGenerator.default;
    _debounce = /*#__PURE__*/ _interopRequireDefault(_debounce);
    _throttle = /*#__PURE__*/ _interopRequireDefault(_throttle);
    _react = /*#__PURE__*/ _interopRequireWildcard(_react);
    var GLOBAL = _utils["__GLOBAL__"];
    /** ???????????????????????????????????? */ function isSyntheticEvent(arg) {
        if (!arg) return false;
        return (0, _utils.isObject)(arg) && "nativeEvent" in arg && "target" in arg && "type" in arg;
    }
    function useFetch(/** ??????Promise return?????????async??????, ??????????????????????????????????????? */ method) {
        var /** ????????? */ options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var getActualPayload = /** ??????????????????payload?????????????????????????????????fetchHandel?????????(??????param???payload) */ function getActualPayload(newPayload) {
            // ??????param????????????????????????param??????
            if ("param" in options) {
                return param;
            }
            // ??????????????????????????????????????????????????????????????????payload??????????????????
            if (isSyntheticEvent(newPayload) || newPayload === undefined) {
                return payload;
            }
            // ????????????payload?????????payload??????????????????payload????????????
            setPayload(newPayload); // ????????????payload
            return newPayload;
        };
        var getResetState = /** ???????????????????????????????????????????????????????????????????????????????????? */ function getResetState(key, value) {
            var resetState = {
                loading: false,
                error: undefined,
                timeout: false
            };
            if (key) {
                resetState[key] = value;
            }
            return resetState;
        };
        var cancel = /** ???????????? */ function cancel() {
            self1.fetchID = 0; // ?????????????????????????????????
            self1.timeoutTimer && GLOBAL.clearTimeout(self1.timeoutTimer);
            setState({
                loading: false
            });
        };
        var self1 = (0, _hooks.useSelf)({
            /** ????????????????????????????????????????????????????????????????????????????????????????????? */ fetchID: 0,
            /** ?????????????????? */ fetchCount: 0,
            /** ??????????????? */ timeoutTimer: 0,
            /** ?????????????????? */ lastFetch: Date.now()
        });
        var initData = options.initData, initPayload = options.initPayload, _deps = options.deps, deps = _deps === void 0 ? [] : _deps, param = options.param, _manual = options.manual, manual = _manual === void 0 ? false : _manual, _timeout = options.timeout, timeout = _timeout === void 0 ? 10000 : _timeout, onSuccess = options.onSuccess, onError = options.onError, onComplete = options.onComplete, onTimeout = options.onTimeout, cacheKey = options.cacheKey, _stale = options.stale, stale = _stale === void 0 ? true : _stale, throttleInterval = options.throttleInterval, debounceInterval = options.debounceInterval, pollingInterval = options.pollingInterval, tmp = options.pass, aPass = tmp === void 0 ? true : tmp;
        var isCache = !!cacheKey; // ?????????????????????key?????????isPost????????????????????????
        var pass = aPass && (0, _utils.isFunction)(method);
        var ref = _slicedToArray((0, _hooks.useSetState)({
            loading: !manual && pass,
            error: undefined,
            timeout: false
        }), 2), state = ref[0], setState = ref[1];
        // ?????????????????????
        (0, _react.useEffect)(function() {
            return function() {
                self1.fetchID = 0; // ?????????????????????????????????
                self1.timeoutTimer && GLOBAL.clearTimeout(self1.timeoutTimer);
            };
        }, []);
        var ref1 = _slicedToArray((0, _hooks.useStorageState)("".concat(cacheKey, "_FETCH_PAYLOAD"), initPayload, {
            disabled: !isCache
        }), 2), payload = ref1[0], setPayload = ref1[1];
        var ref2 = _slicedToArray((0, _hooks.useStorageState)("".concat(cacheKey, "_FETCH_DATA"), initData, {
            disabled: !isCache
        }), 2), data = ref2[0], setData = ref2[1];
        var ref3 = _slicedToArray((0, _react.useState)(true), 2), polling = ref3[0], setPolling = ref3[1];
        var fetchHandel = (0, _hooks.useFn)(function() {
            var __fetchHandel = _asyncToGenerator(function(args) {
                var isUpdate, cID, cTimeoutTimer, _tmp, res, _tmp1, err, _tmp2;
                var _arguments = arguments;
                return _tsGenerator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            isUpdate = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : false;
                            if (!pass) {
                                return [
                                    2,
                                    [
                                        new Error("the request has been ignored"),
                                        null
                                    ]
                                ];
                            }
                            self1.lastFetch = Date.now();
                            cID = Math.random();
                            self1.fetchID = cID;
                            // ????????????????????????
                            self1.timeoutTimer && GLOBAL.clearTimeout(self1.timeoutTimer);
                            self1.timeoutTimer = GLOBAL.setTimeout(function() {
                                cancel();
                                onTimeout === null || onTimeout === void 0 ? void 0 : onTimeout();
                                setState(_objectSpread({}, getResetState("timeout", true)));
                            }, timeout);
                            cTimeoutTimer = self1.timeoutTimer;
                            _tmp = {};
                            // ??????????????????
                            if (!state.loading) {
                                setState(_objectSpread(_tmp, getResetState("loading", true)));
                            }
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                3,
                                4,
                                5
                            ]);
                            return [
                                4,
                                method(args)
                            ];
                        case 2:
                            res = _state.sent();
                            _tmp1 = {};
                            if (cID === self1.fetchID) {
                                setState(_objectSpread(_tmp1, getResetState("loading", false)));
                                setData(res);
                                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(res, isUpdate);
                                return [
                                    2,
                                    [
                                        undefined,
                                        res
                                    ]
                                ];
                            }
                            return [
                                3,
                                5
                            ];
                        case 3:
                            err = _state.sent();
                            _tmp2 = {};
                            if (cID === self1.fetchID) {
                                setState(_objectSpread(_tmp2, getResetState("error", err)));
                                onError === null || onError === void 0 ? void 0 : onError(err);
                                return [
                                    2,
                                    [
                                        err,
                                        undefined
                                    ]
                                ];
                            }
                            return [
                                3,
                                5
                            ];
                        case 4:
                            // ?????????????????????
                            cTimeoutTimer && GLOBAL.clearTimeout(cTimeoutTimer);
                            if (cID === self1.fetchID) {
                                onComplete === null || onComplete === void 0 ? void 0 : onComplete();
                                self1.fetchCount++;
                            }
                            return [
                                7
                            ];
                        case 5:
                            // ???????????????????????????
                            return [
                                2,
                                [
                                    new Error("never execute"),
                                    null
                                ]
                            ];
                    }
                });
            });
            function _fetchHandel(args) {
                return __fetchHandel.apply(this, arguments);
            }
            return _fetchHandel;
        }(), function(fn) {
            if (throttleInterval) {
                return (0, _throttle.default)(fn, throttleInterval, {
                    trailing: false
                }); // ???????????????????????????????????????
            }
            if (debounceInterval) {
                return (0, _debounce.default)(fn, debounceInterval);
            }
            return fn;
        });
        /** ?????????????????? */ var send = (0, _hooks.useFn)(function(newPayload) {
            var isUpdate = isSyntheticEvent(newPayload) || newPayload === undefined;
            return fetchHandel(getActualPayload(newPayload), isUpdate);
        });
        /** ??????param?????????????????????????????????????????? */ (0, _hooks.useEffectEqual)(function() {
            if (!("param" in options)) return;
            if (self1.fetchCount === 0 || manual) return;
            fetchHandel(getActualPayload(), false); // ???????????????????????????????????????
        }, [
            param
        ]);
        /** ??????????????????????????????????????? */ (0, _react.useEffect)(function() {
            if (manual || !pass) return;
            // ?????????????????????????????????????????????stale???????????????
            if (!stale && self1.fetchCount === 0 && !(0, _utils.isEmpty)(data)) {
                setState({
                    loading: false
                });
                return;
            }
            fetchHandel(getActualPayload(), self1.fetchCount !== 0);
        }, [
            pass
        ].concat(_toConsumableArray(deps)));
        /** ???????????? */ (0, _react.useEffect)(function intervalHandle() {
            var timer;
            if (polling && pollingInterval && pollingInterval > 500) {
                timer = GLOBAL.setInterval(function() {
                    var now = Date.now();
                    var last = self1.lastFetch;
                    var reFetch = now - last >= pollingInterval;
                    reFetch && send();
                }, pollingInterval);
            }
            return function() {
                timer && clearInterval(timer);
            };
        }, [
            pollingInterval,
            polling
        ]);
        return _objectSpreadProps(_objectSpread({}, state), {
            send: send,
            data: data,
            payload: payload,
            param: param,
            setData: setData,
            cancel: cancel,
            polling: polling,
            setPolling: setPolling
        });
    }
});
