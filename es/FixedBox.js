import React, { Component } from 'react';

import { isNull, isFunc, isNumber } from './helpers';

const ERROR_PREFIX = '[FixedBox]';
const events = {
  SCROLL: 'scroll',
  RESIZE: 'resize'
};

class FixedBox extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isFixed: false
    }, this.$container = null, this.handleContainerRef = $node => {
      this.$container = $node;
    }, this.updatePosition = () => {
      const { $container } = this;
      if (isNull($container)) return;

      // $FlowFixMe
      const $child = $container.firstElementChild;
      if (isNull($child)) return;

      const { isFixed } = this.state;
      const { minTopPos, minLeftPos } = this.props;
      const { top, left } = $container.getBoundingClientRect();
      const width = $child.offsetWidth;
      const height = $child.offsetHeight;
      const shouldFixTop = top <= minTopPos;
      const shouldFixLeft = left <= minLeftPos;
      const shouldFix = shouldFixTop || shouldFixLeft;

      let position;
      let posTop;
      let posLeft;

      if (shouldFix) {
        position = 'fixed';
        $container.style.width = `${width}px`;
        $container.style.height = `${height}px`;
      } else {
        position = 'relative';
        $container.style.width = '';
        $container.style.height = '';
      }

      if (shouldFixTop) {
        posTop = isNumber(minTopPos) ? minTopPos : top;
      } else {
        posTop = shouldFixLeft ? top : 0;
      }

      if (shouldFixLeft) {
        posLeft = isNumber(minLeftPos) ? minLeftPos : left;
      } else {
        posLeft = shouldFixTop ? left : 0;
      }

      $child.style.position = position;
      $child.style.left = `${posLeft}px`;
      $child.style.top = `${posTop}px`;

      if (shouldFix !== isFixed) {
        this.setState({ isFixed: shouldFix });
      }
    }, _temp;
  }

  componentDidMount() {
    const { updatePosition } = this;

    updatePosition();
    document.addEventListener(events.SCROLL, updatePosition, true);
    window.addEventListener(events.RESIZE, updatePosition, true);
  }

  componentWillUnmount() {
    const { updatePosition } = this;

    document.removeEventListener(events.SCROLL, updatePosition, true);
    window.removeEventListener(events.RESIZE, updatePosition, true);
  }

  componentDidUpdate() {
    const { $container } = this;

    if (isNull($container)) {
      throw new Error(
      // eslint-disable-next-line max-len
      `${ERROR_PREFIX}: <FixedBox /> component should have exactly one child element`);
    }
  }

  render() {
    const { isFixed } = this.state;
    const { children, className } = this.props;

    return React.createElement(
      'div',
      { ref: this.handleContainerRef, className: className },
      isFunc(children) ? children(isFixed) : children
    );
  }
}

FixedBox.defaultProps = {
  className: '',
  minTopPos: -Infinity,
  minLeftPos: -Infinity
};
export default FixedBox;