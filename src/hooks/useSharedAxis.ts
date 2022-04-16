import { useContext } from 'react';
import SharedAxisContext from '../contexts/SharedAxisContext';

const useSharedAxis = () => useContext(SharedAxisContext);

export default useSharedAxis;
