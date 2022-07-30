import { CSSProperties, useCallback } from 'react';
import classNames from 'classnames';

import usePrevious from '../../hooks/usePrevious';
import SharedAxisContext from '../../contexts/SharedAxisContext';
import SharedAxisItem from './SharedAxisItem';

import { SharedAxisProps } from '../../types/SharedAxis';

import classes from '../../styles/SharedAxis.module.css';

const SharedAxis = ({
  step = 0,
  axis = 'x',
  timeout = 300,
  fadeVariant = false,
  children,
  className,
  style,
  ...props
}: SharedAxisProps) => {
  const prevStep = usePrevious(step);

  const items = Array.isArray(children) ? children : [children];

  const getDirection = useCallback(
    () => (step > (prevStep || 0) ? 'forward' : 'back'),
    [step, prevStep]
  );

  return (
    <SharedAxisContext.Provider value={{ step, axis, timeout, fadeVariant }}>
      <div
        {...props}
        className={classNames(classes['sharedAxis-container'], className)}
        style={{ ...style, '--timeout': `${timeout}ms` } as CSSProperties}
      >
        {items.map((child, index) => (
          <SharedAxisItem
            key={`sharedAxis-step-${index}`}
            index={index}
            direction={getDirection()}
          >
            {child}
          </SharedAxisItem>
        ))}
      </div>
    </SharedAxisContext.Provider>
  );
};

export default SharedAxis;
export { SharedAxisItem };
