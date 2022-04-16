import { createContext } from 'react';

export const initialState = {
  step: 0,
  axis: 'x',
  fadeVariant: false,
};

const SharedAxisContext = createContext(initialState);

export default SharedAxisContext;
