import { createContext } from 'react';
import { ISharedAxisContext } from '../types/SharedAxis';

export const initialState: ISharedAxisContext = {
  step: 0,
  axis: 'x',
  fadeVariant: false,
};

const SharedAxisContext = createContext<ISharedAxisContext>(initialState);

export default SharedAxisContext;
