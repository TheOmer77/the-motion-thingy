import { useContext } from 'react';
import SharedAxisContext from '../contexts/SharedAxisContext';

const useTransformingContainer = () => useContext(SharedAxisContext);

export default useTransformingContainer;
