/* @flow */
import React, { Component } from 'react'

import type { Edges } from './types'
import { isNull, isFunc, getShiftX, getShiftY, getChildRect } from './helpers'

const ERROR_PREFIX = '[FixedBox]'
const events = {
  SCROLL: 'scroll',
  RESIZE: 'resize',
}
const defaultEdges = {
  top: -Infinity,
  right: -Infinity,
  bottom: -Infinity,
  left: -Infinity,
}

type State = {|
  isFixed: boolean,
|}

type $Maybe<Obj: {}> = $ObjMap<Obj, <V>(V) => ?V>

type Props = {|
  className?: string,
  edges: $Maybe<Edges>,
  children: React$Node | ((isFixed: boolean) => React$Node),
|}

class FixedBox extends Component<Props, State> {
  static defaultProps = {
    className: '',
    edges: {},
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

  updatePosition = () => {
    const { state, props, $container } = this

    if (isNull($container)) return

    const $child: HTMLElement | null = ($container.firstElementChild: any)

    if (isNull($child)) return

    const edges = (Object.assign({}, defaultEdges, props.edges): any)
    const rect = getChildRect($container, $child)
    const shiftX = getShiftX(edges, rect)
    const shiftY = getShiftY(edges, rect)
    const isFixed = shiftX !== 0 || shiftY !== 0

    if (isFixed !== state.isFixed) {
      this.setState({ isFixed })
    }

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
