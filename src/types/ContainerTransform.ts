import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ContainerTransformProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  expanded?: boolean;
  expandedClassName?: string;
  scrimClassName?: string;
}

export interface IContainerTransformContext {
  expanded: boolean;
  rootElementRef?: React.RefObject<HTMLDivElement>;
  // TODO: Currently rendered component in a list
}
