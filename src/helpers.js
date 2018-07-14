/* @flow */
import type { Rect, Props } from './types'

export function isFunc(arg: mixed): boolean %checks {
  return typeof arg === 'function'
}

export function isNull(arg: mixed): boolean %checks {
  return arg === null
}

export function shouldFixTop(props: Props, rect: Rect): boolean {
  return rect.top < props.minTopPos
}

export function shouldFixRight(props: Props, rect: Rect): boolean {
  return rect.right < props.minRightPos
}

export function shouldFixBottom(props: Props, rect: Rect): boolean {
  return rect.bottom < props.minBottomPos
}

export function shouldFixLeft(props: Props, rect: Rect): boolean {
  return rect.left < props.minLeftPos
}

export function shouldFix(props: Props, rect: Rect): boolean {
  return (
    shouldFixTop(props, rect) ||
    shouldFixRight(props, rect) ||
    shouldFixBottom(props, rect) ||
    shouldFixLeft(props, rect)
  )
}

export function getShiftX(props: Props, rect: Rect): number {
  if (shouldFixLeft(props, rect)) {
    return props.minLeftPos - rect.left
  }

  if (shouldFixRight(props, rect)) {
    return rect.right - props.minRightPos
  }

  return 0
}

export function getShiftY(props: Props, rect: Rect): number {
  if (shouldFixTop(props, rect)) {
    return props.minTopPos - rect.top
  }

  if (shouldFixBottom(props, rect)) {
    return rect.bottom - props.minBottomPos
  }

  return 0
}

export function getChildRect($parent: HTMLElement, $child: HTMLElement): Rect {
  const parentRect = $parent.getBoundingClientRect()
  const { left, bottom } = parentRect

  return {
    top: parentRect.top,
    right: window.innerWidth - (left + $child.offsetWidth),
    bottom: window.innerHeight - bottom,
    left: parentRect.left,
  }
}
