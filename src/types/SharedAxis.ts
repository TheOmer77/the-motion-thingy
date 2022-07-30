import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type Axis = 'x' | 'y' | 'z';
export type Direction = 'back' | 'forward';

export interface SharedAxisProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  step: number;
  axis: Axis;
  timeout?: number;
  fadeVariant?: boolean;
}

export interface SharedAxisItemProps {
  index: number;
  direction: Direction;
  children: ReactNode;
  timeout?: number;
}

export interface ISharedAxisContext {
  step: number;
  axis: Axis;
  timeout?: number;
  fadeVariant?: boolean;
}
