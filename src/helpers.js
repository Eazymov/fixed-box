/* @flow */
import type { Rect, Edges } from './types'

export function isFunc(arg: mixed): boolean %checks {
  return typeof arg === 'function'
}

export function isNull(arg: mixed): boolean %checks {
  return arg === null
}

export function shouldFixTop(edges: Edges, rect: Rect): boolean {
  return rect.top <= edges.top
}

export function shouldFixRight(edges: Edges, rect: Rect): boolean {
  return rect.right <= edges.right
}

export function shouldFixBottom(edges: Edges, rect: Rect): boolean {
  return rect.bottom <= edges.bottom
}

export function shouldFixLeft(edges: Edges, rect: Rect): boolean {
  return rect.left <= edges.left
}

export function shouldFix(edges: Edges, rect: Rect): boolean {
  return (
    shouldFixTop(edges, rect) ||
    shouldFixRight(edges, rect) ||
    shouldFixBottom(edges, rect) ||
    shouldFixLeft(edges, rect)
  )
}

export function getShiftX(edges: Edges, rect: Rect): number {
  if (shouldFixLeft(edges, rect)) {
    return edges.left - rect.left
  }

  if (shouldFixRight(edges, rect)) {
    return rect.right - edges.right
  }

  return 0
}

export function getShiftY(edges: Edges, rect: Rect): number {
  if (shouldFixTop(edges, rect)) {
    return edges.top - rect.top
  }

  if (shouldFixBottom(edges, rect)) {
    return rect.bottom - edges.bottom
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
