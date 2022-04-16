import { useCallback } from 'react';
import classNames from 'classnames';

import usePrevious from '../hooks/usePrevious';
import SharedAxisItem from './SharedAxisItem';

import classes from '../styles/SharedAxis.module.css';

/** @typedef {'x' | 'y' | 'z'} Axis */

/**
 * @param {{
 *  axis: Axis;
 *  step: number;
 * } & import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props
 */
const SharedAxis = ({
  axis = 'x',
  step = 0,
  children,
  className,
  ...props
}) => {
  const prevStep = usePrevious(step);

  const items = Array.isArray(children) ? children : [children];

  const getDirection = useCallback(
    () => (step > prevStep ? 'forward' : 'back'),
    [step, prevStep]
  );

  return (
    <div
      {...props}
      className={classNames(classes['sharedAxis-container'], className)}
    >
      {items.map((child, index) => (
        <SharedAxisItem
          axis={axis}
          direction={getDirection()}
          key={`sharedAxis-step-${index}`}
          in={step === index}
        >
          {child}
        </SharedAxisItem>
      ))}
    </div>
  );
};

export default SharedAxis;
