/* @flow */
import React, { Component } from 'react'

import type { Rect, Props } from './types'
import {
  isNull,
  isFunc,
  shouldFix,
  getShiftX,
  getShiftY,
  getChildRect,
} from './helpers'

const ERROR_PREFIX = '[FixedBox]'
const events = {
  SCROLL: 'scroll',
  RESIZE: 'resize',
}

type State = {|
  isFixed: boolean,
|}

class FixedBox extends Component<Props, State> {
  static defaultProps = {
    className: '',
    minTopPos: -Infinity,
    minRightPos: -Infinity,
    minBottomPos: -Infinity,
    minLeftPos: -Infinity,
  }

  state = {
    isFixed: false,
  }
  $container: null | HTMLElement = null

  componentDidMount() {
    const { updatePosition } = this

    updatePosition()
    document.addEventListener(events.SCROLL, updatePosition, true)
    window.addEventListener(events.RESIZE, updatePosition, true)
  }

  componentWillUnmount() {
    const { updatePosition } = this

    document.removeEventListener(events.SCROLL, updatePosition, true)
    window.removeEventListener(events.RESIZE, updatePosition, true)
  }

  componentDidUpdate() {
    const { $container } = this

    if (isNull($container)) {
      throw new Error(
        // eslint-disable-next-line max-len
        `${ERROR_PREFIX}: <FixedBox /> component should have exactly one child element`,
      )
    }

    this.updatePosition()
  }

  updateState(rect: Rect) {
    const { state, props } = this
    const shouldBeFixed = shouldFix(props, rect)

    if (state.isFixed !== shouldBeFixed) {
      this.setState({ isFixed: shouldBeFixed })
    }
  }

  updatePosition = () => {
    const { props, $container } = this

    if (isNull($container)) return

    const $child: HTMLElement | null = ($container.firstElementChild: any)

    if (isNull($child)) return

    const rect = getChildRect($container, $child)
    const shiftX = getShiftX(props, rect)
    const shiftY = getShiftY(props, rect)

    this.updateState(rect)
    $child.style.transform = `translate(${shiftX}px, ${shiftY}px)`
  }

  handleContainerRef = ($node: null | HTMLElement) => {
    this.$container = $node
  }

  render() {
    const { isFixed } = this.state
    const { children, className } = this.props

    return (
      <div ref={this.handleContainerRef} className={className}>
        {isFunc(children) ? children(isFixed) : children}
      </div>
    )
  }
}

export default FixedBox
