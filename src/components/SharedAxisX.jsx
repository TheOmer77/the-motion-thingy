import { useCallback } from 'react';
import classNames from 'classnames';

import usePrevious from '../hooks/usePrevious';
import SharedAxisItem from './SharedAxisItem';

import classes from '../styles/SharedAxisX.module.css';

/**
 * @param {{
 *  step: number;
 * } & import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props
 */
const SharedAxisX = ({ step = 0, children, className, ...props }) => {
  const prevStep = usePrevious(step);

  const items = Array.isArray(children) ? children : [children];

  const getDirection = useCallback(
    () => (step > prevStep ? 'forward' : 'back'),
    [step, prevStep]
  );

  return (
    <div {...props} className={classNames(classes['sharedAxisX'], className)}>
      {items.map((child, index) => (
        <SharedAxisItem
          axis='x'
          direction={getDirection()}
          key={`sharedAxisX-step-${index}`}
          in={step === index}
        >
          {child}
        </SharedAxisItem>
      ))}
    </div>
  );
};

export default SharedAxisX;
