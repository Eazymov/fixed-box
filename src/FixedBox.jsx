/* @flow */
import React, { Component } from 'react'

import { isNull, isFunc } from './helpers'

const ERROR_PREFIX = '[FixedBox]'
const events = {
  SCROLL: 'scroll',
  RESIZE: 'resize',
}

type Props = {|
  className?: string,
  minTopPos: number,
  minLeftPos: number,
  children: React$Node | ((isFixed: boolean) => React$Node),
|}

type State = {|
  isFixed: boolean,
|}

class FixedBox extends Component<Props, State> {
  static defaultProps = {
    className: '',
    minTopPos: -Infinity,
    minLeftPos: -Infinity,
  }

  state = {
    isFixed: false,
  }
  rect = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  $container: null | HTMLElement = null

  get shouldFixTop() {
    return this.rect.top < this.props.minTopPos
  }

  get shouldFixLeft() {
    return this.rect.left < this.props.minLeftPos
  }

  get shouldFix() {
    return this.shouldFixTop || this.shouldFixLeft
  }

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

  updateRects($container: HTMLElement, $child: HTMLElement) {
    const containerRect = $container.getBoundingClientRect()
    const { left, bottom } = containerRect
    const rect = {
      top: containerRect.top,
      right: window.innerWidth - (left + $child.offsetWidth),
      bottom: window.innerHeight - bottom,
      left: containerRect.left,
    }

    this.rect = rect
  }

  updateState() {
    const { shouldFix } = this
    const { isFixed } = this.state

    if (isFixed !== shouldFix) {
      this.setState({ isFixed: shouldFix })
    }
  }

  updateContainerRect($container: HTMLElement) {
    this.rect = $container.getBoundingClientRect()
  }

  getShiftY() {
    const { rect, props } = this

    if (this.shouldFixTop) {
      return props.minTopPos - rect.top
    }

    return 0
  }

  getShiftX() {
    const { rect, props } = this

    if (this.shouldFixLeft) {
      return props.minLeftPos - rect.left
    }

    return 0
  }

  updatePosition = () => {
    const { $container } = this

    if (isNull($container)) return

    const $child: HTMLElement = ($container.firstElementChild: any)

    if (isNull($child)) return

    this.updateRects($container, $child)
    this.updateState()

    const shiftX = this.getShiftX()
    const shiftY = this.getShiftY()

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
