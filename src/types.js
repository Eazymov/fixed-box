/* @flow */

export type Rect = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
|}

export type Props = {|
  className?: string,
  minTopPos: number,
  minRightPos: number,
  minBottomPos: number,
  minLeftPos: number,
  children: React$Node | ((isFixed: boolean) => React$Node),
|}
