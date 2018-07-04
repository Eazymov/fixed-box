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
    left: 0,
    right: 0,
    width: 0,
    bottom: 0,
    height: 0,
  }
  $container: null | HTMLElement = null

  get shouldFix() {
    return this.shouldFixLeft || this.shouldFixTop
  }

  get shouldFixLeft() {
    return this.rect.left <= this.props.minLeftPos
  }

  get shouldFixTop() {
    return this.rect.top <= this.props.minTopPos
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

  handleContainerRef = ($node: null | HTMLElement) => {
    this.$container = $node
  }

  updateContainerRect($container: HTMLElement) {
    this.rect = $container.getBoundingClientRect()
  }

  updateCssPosition($child: HTMLElement) {
    const { isFixed } = this.state
    const { shouldFix, $container } = this

    if (!$container) return
    if (isFixed !== shouldFix) {
      this.setState({ isFixed: shouldFix })
    }

    if (shouldFix) {
      const width = $child.offsetWidth
      const height = $child.offsetHeight

      $child.style.position = 'fixed'
      $container.style.width = `${width}px`
      $container.style.height = `${height}px`
    } else {
      $child.style.position = 'relative'
      $container.style.width = ''
      $container.style.height = ''
    }
  }

  updateLeftPos($child: HTMLElement) {
    const { minLeftPos } = this.props
    let posLeft: number

    if (this.shouldFixLeft) {
      posLeft = minLeftPos
    } else {
      posLeft = this.shouldFixTop ? this.rect.left : 0
    }

    $child.style.left = `${posLeft}px`
  }

  updateTopPos($child: HTMLElement) {
    const { minTopPos } = this.props
    let posTop: number

    if (this.shouldFixTop) {
      posTop = minTopPos
    } else {
      posTop = this.shouldFixLeft ? this.rect.top : 0
    }

    $child.style.top = `${posTop}px`
  }

  updatePosition = () => {
    const { $container } = this
    if (isNull($container)) return

    const $child: HTMLElement = ($container.firstElementChild: any)
    if (isNull($child)) return

    this.updateContainerRect($container)
    this.updateCssPosition($child)
    this.updateLeftPos($child)
    this.updateTopPos($child)
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
