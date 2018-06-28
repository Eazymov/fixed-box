import React from 'react';

class FixedBox extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isFixed: false
    }, this.$container = null, this.handleContainerRef = $node => {
      this.$container = $node;
    }, this.updatePosition = ({
      setFixed,
      minTopPos = -Infinity,
      minLeftPos = -Infinity
    }) => {
      if (!$ref) return;

      // $FlowFixMe
      const floatContainer = $ref.firstElementChild;

      if (!floatContainer) return;

      const { top, left } = $ref.getBoundingClientRect();
      const width = floatContainer.offsetWidth;
      const height = floatContainer.offsetHeight;
      const shouldFixTop = top <= minTopPos;
      const shouldFixLeft = left <= minLeftPos;
      const shouldFix = shouldFixTop || shouldFixLeft;

      let position;
      let posTop;
      let posLeft;

      if (shouldFix) {
        position = 'fixed';
        $ref.style.width = `${width}px`;
        $ref.style.height = `${height}px`;
      } else {
        position = 'relative';
        $ref.style.width = '';
        $ref.style.height = '';
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

      floatContainer.style.position = position;
      floatContainer.style.left = `${posLeft}px`;
      floatContainer.style.top = `${posTop}px`;

      setFixed(shouldFix);
    }, _temp;
  }

  render() {
    const { isFixed } = this.state;
    const { children, className } = this.props;

    return React.createElement(
      'div',
      { ref: this.handleContainerRef, className: className },
      typeof children === 'function' ? children(isFixed) : children
    );
  }
}

FixedBox.defaultProps = {
  className: ''
};
export default FixedBox;