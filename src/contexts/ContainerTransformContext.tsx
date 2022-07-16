import { createContext } from 'react';
import { IContainerTransformContext } from '../types/ContainerTransform';

const initialState: IContainerTransformContext = { expanded: false };

export const ContainerTransformContext =
  createContext<IContainerTransformContext>(initialState);
