import { cloneElement, isValidElement, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import useContainerTransform from '../../hooks/useContainerTransform';
import timeoutFromTransitionString from '../../utils/timeoutFromTransitionString';

import classes from '../../styles/ContainerTransform.module.css';

const CollapsedComponent = ({
  alwaysRender,
  children,
}: {
  alwaysRender?: boolean;
  children: ReactNode;
}) => {
  const { expanded } = useContainerTransform();

  const ref = useRef<HTMLDivElement>(null);

  const timeouts = {
    componentsIn: ref.current
      ? timeoutFromTransitionString(
          getComputedStyle(ref.current).getPropertyValue(
            '--transition--componentsIn'
          )
        )
      : 0,
    componentsOut: ref.current
      ? timeoutFromTransitionString(
          getComputedStyle(ref.current).getPropertyValue(
            '--transition--componentsOut'
          )
        )
      : 0,
  };

  return (
    <CSSTransition
      in={!expanded || alwaysRender}
      timeout={expanded ? timeouts.componentsIn : timeouts.componentsOut}
      classNames={{
        enter: classes['inner-container--collapsed--enter'],
        enterActive: classes['inner-container--collapsed--enter-active'],
        exit: classes['inner-container--collapsed--exit'],
        exitActive: classes['inner-container--collapsed--exit-active'],
      }}
      unmountOnExit
      nodeRef={ref}
    >
      {isValidElement(children) && cloneElement(children, { ref })}
    </CSSTransition>
  );
};

export default CollapsedComponent;
