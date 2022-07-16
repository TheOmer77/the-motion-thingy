import { useContext } from 'react';
import { ContainerTransformContext } from '../contexts/ContainerTransformContext';

const useContainerTransform = () => useContext(ContainerTransformContext);

export default useContainerTransform;
