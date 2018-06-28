'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ERROR_PREFIX = '[FixedBox]';
var events = {
  SCROLL: 'scroll',
  RESIZE: 'resize'
};

var FixedBox = function (_Component) {
  _inherits(FixedBox, _Component);

  function FixedBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedBox.__proto__ || Object.getPrototypeOf(FixedBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isFixed: false
    }, _this.$container = null, _this.handleContainerRef = function ($node) {
      _this.$container = $node;
    }, _this.updatePosition = function () {
      var _this2 = _this,
          $container = _this2.$container;

      if ((0, _helpers.isNull)($container)) return;

      // $FlowFixMe
      var $child = $container.firstElementChild;
      if ((0, _helpers.isNull)($child)) return;

      var isFixed = _this.state.isFixed;
      var _this$props = _this.props,
          minTopPos = _this$props.minTopPos,
          minLeftPos = _this$props.minLeftPos;

      var _$container$getBoundi = $container.getBoundingClientRect(),
          top = _$container$getBoundi.top,
          left = _$container$getBoundi.left;

      var width = $child.offsetWidth;
      var height = $child.offsetHeight;
      var shouldFixTop = top <= minTopPos;
      var shouldFixLeft = left <= minLeftPos;
      var shouldFix = shouldFixTop || shouldFixLeft;

      var position = void 0;
      var posTop = void 0;
      var posLeft = void 0;

      if (shouldFix) {
        position = 'fixed';
        $container.style.width = width + 'px';
        $container.style.height = height + 'px';
      } else {
        position = 'relative';
        $container.style.width = '';
        $container.style.height = '';
      }

      if (shouldFixTop) {
        posTop = (0, _helpers.isNumber)(minTopPos) ? minTopPos : top;
      } else {
        posTop = shouldFixLeft ? top : 0;
      }

      if (shouldFixLeft) {
        posLeft = (0, _helpers.isNumber)(minLeftPos) ? minLeftPos : left;
      } else {
        posLeft = shouldFixTop ? left : 0;
      }

      $child.style.position = position;
      $child.style.left = posLeft + 'px';
      $child.style.top = posTop + 'px';

      if (shouldFix !== isFixed) {
        _this.setState({ isFixed: shouldFix });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FixedBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var updatePosition = this.updatePosition;


      updatePosition();
      document.addEventListener(events.SCROLL, updatePosition, true);
      window.addEventListener(events.RESIZE, updatePosition, true);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var updatePosition = this.updatePosition;


      document.removeEventListener(events.SCROLL, updatePosition, true);
      window.removeEventListener(events.RESIZE, updatePosition, true);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var $container = this.$container;


      if ((0, _helpers.isNull)($container)) {
        throw new Error(
        // eslint-disable-next-line max-len
        ERROR_PREFIX + ': <FixedBox /> component should have exactly one child element');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isFixed = this.state.isFixed;
      var _props = this.props,
          children = _props.children,
          className = _props.className;


      return _react2.default.createElement(
        'div',
        { ref: this.handleContainerRef, className: className },
        (0, _helpers.isFunc)(children) ? children(isFixed) : children
      );
    }
  }]);

  return FixedBox;
}(_react.Component);

FixedBox.defaultProps = {
  className: '',
  minTopPos: -Infinity,
  minLeftPos: -Infinity
};
exports.default = FixedBox;