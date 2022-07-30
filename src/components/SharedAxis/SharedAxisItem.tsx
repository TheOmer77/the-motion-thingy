import { useRef, cloneElement, isValidElement } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import useSharedAxis from '../../hooks/useSharedAxis';

import { SharedAxisItemProps } from '../../types/SharedAxis';

import classes from '../../styles/SharedAxis.module.css';

const SharedAxisItem = ({
  index,
  direction = 'forward',
  timeout = 300,
  children,
}: SharedAxisItemProps) => {
  const { step, axis, timeout: groupTimeout, fadeVariant } = useSharedAxis();
  const ref = useRef(null);

  const itemEnterClassname = `sharedAxis-item-enter-${axis}-${direction}`,
    itemEnterFadeClassname = `sharedAxis-item-enter-fade-${direction}`,
    itemExitActiveClassname = `sharedAxis-item-exit-active-${axis}-${direction}`,
    itemExitActiveFadeClassname = `sharedAxis-item-exit-active-fade-${direction}`;

  return (
    <CSSTransition
      in={step === index}
      nodeRef={ref}
      classNames={{
        enter: classNames(
          classes['sharedAxis-item-enter'],
          classes[itemEnterClassname as keyof typeof classes],
          fadeVariant && classes[itemEnterFadeClassname as keyof typeof classes]
        ),
        enterActive: classes['sharedAxis-item-enter-active'],
        exit: classes['sharedAxis-item-exit'],
        exitActive: classNames(
          classes['sharedAxis-item-exit-active'],
          classes[itemExitActiveClassname as keyof typeof classes],
          fadeVariant &&
            classes[itemExitActiveFadeClassname as keyof typeof classes]
        ),
      }}
      timeout={groupTimeout || timeout}
      unmountOnExit
    >
      {isValidElement(children) &&
        cloneElement(children, {
          ref,
          ...(groupTimeout ? {} : { style: { '--timeout': `${timeout}ms` } }),
        })}
    </CSSTransition>
  );
};

export default SharedAxisItem;
