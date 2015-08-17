Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _shallowequal = require("shallowequal");

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var RESERVED_PROPS = {
    arguments: true,
    caller: true,
    key: true,
    length: true,
    name: true,
    prototype: true,
    ref: true,
    type: true
};

exports["default"] = function (Component) {
    (0, _invariant2["default"])(typeof Object.is(Component.handleChange, "function"), "handleChange(propsList) is not a function.");

    var mountedInstances = new Set();
    var emitChange = function emitChange() {
        Component.handleChange([].concat(_toConsumableArray(mountedInstances)).map(function (instance) {
            return instance.props;
        }));
    };

    var CreateSideEffect = (function (_React$Component) {
        _inherits(CreateSideEffect, _React$Component);

        function CreateSideEffect() {
            _classCallCheck(this, CreateSideEffect);

            _get(Object.getPrototypeOf(CreateSideEffect.prototype), "constructor", this).apply(this, arguments);
        }

        _createClass(CreateSideEffect, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                mountedInstances.add(this);
                emitChange();
            }
        }, {
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                return !(0, _shallowequal2["default"])(nextProps, this.props);
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                emitChange();
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                if (mountedInstances.has(this)) {
                    mountedInstances["delete"](this);
                }

                emitChange();
            }
        }, {
            key: "render",
            value: function render() {
                return _react2["default"].createElement(Component, this.props);
            }
        }], [{
            key: "dispose",
            value: function dispose() {
                mountedInstances.clear();
                emitChange();
            }
        }, {
            key: "displayName",
            value: "CreateSideEffect",
            enumerable: true
        }]);

        return CreateSideEffect;
    })(_react2["default"].Component);

    Object.getOwnPropertyNames(Component).filter(function (componentKey) {
        return Component.hasOwnProperty(componentKey) && !RESERVED_PROPS[componentKey];
    }).forEach(function (componentKey) {
        CreateSideEffect[componentKey] = Component[componentKey];
    });

    return CreateSideEffect;
};

module.exports = exports["default"];