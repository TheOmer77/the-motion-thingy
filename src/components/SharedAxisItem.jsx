import { useRef, useCallback, cloneElement } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import classes from '../styles/SharedAxisX.module.css';

/**
 * @param {{
 *  axis: 'x' | 'y' | 'z';
 *  direction: 'back' | 'forward'
 *  in: boolean;
 *  children: import('react').ReactNode;
 * }} props
 */
const SharedAxisItem = ({
  axis = 'x',
  direction = 'forward',
  in: active,
  children,
}) => {
  const ref = useRef(null);

  return (
    <CSSTransition
      in={active}
      nodeRef={ref}
      classNames={{
        enter: classNames(
          classes[`sharedAxis${axis.toUpperCase()}-item-enter`],
          classes[`sharedAxis${axis.toUpperCase()}-item-enter-${direction}`]
        ),
        enterActive:
          classes[`sharedAxis${axis.toUpperCase()}-item-enter-active`],
        exit: classes[`sharedAxis${axis.toUpperCase()}-item-exit`],
        exitActive: classNames(
          classes[`sharedAxis${axis.toUpperCase()}-item-exit-active`],
          classes[
            `sharedAxis${axis.toUpperCase()}-item-exit-active-${direction}`
          ]
        ),
      }}
      timeout={300}
      unmountOnExit
    >
      {cloneElement(children, { ref })}
    </CSSTransition>
  );
};

export default SharedAxisItem;
