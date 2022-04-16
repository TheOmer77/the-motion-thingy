import { useRef, cloneElement } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import classes from '../styles/SharedAxis.module.css';

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
          classes[`sharedAxis-item-enter`],
          classes[`sharedAxis-item-enter-${axis}-${direction}`]
        ),
        enterActive: classes[`sharedAxis-item-enter-active`],
        exit: classes[`sharedAxis-item-exit`],
        exitActive: classNames(
          classes[`sharedAxis-item-exit-active`],
          classes[`sharedAxis-item-exit-active-${axis}-${direction}`]
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
