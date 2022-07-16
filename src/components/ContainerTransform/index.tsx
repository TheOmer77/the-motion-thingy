import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import timeoutFromTransitionString from '../../utils/timeoutFromTransitionString';
import useRect from '../../hooks/useRect';
import { ContainerTransformContext } from '../../contexts/ContainerTransformContext';
import { ContainerTransformProps } from '../../types/ContainerTransform';

import classes from '../../styles/ContainerTransform.module.css';

const ContainerTransform = ({
  expanded = false,
  className,
  expandedClassName = classes['transforming-container--expanded'],
  scrimClassName,
  style,
  ...props
}: ContainerTransformProps) => {
  const rootRef = useRef<HTMLDivElement>(null),
    containerRef = useRef<HTMLDivElement>(null),
    placeholderContainerRef = useRef<HTMLDivElement>(null),
    // Extra refs to fix 'Warning: findDOMNode is deprecated in StrictMode.'
    scrimRef = useRef<HTMLDivElement>(null);

  const containerRect = useRect(containerRef);

  const [placeholderRect, setPlaceholderRect] = useState(containerRect);

  const containerVariables = useMemo(
    () =>
      ({
        '--collapsedTop': `${placeholderRect?.top}px`,
        '--collapsedBottom': `${placeholderRect?.bottom}px`,
        '--collapsedLeft': `${placeholderRect?.left}px`,
        '--collapsedRight': `${placeholderRect?.right}px`,
        '--collapsedWidth': `${placeholderRect?.width}px`,
        '--collapsedHeight': `${placeholderRect?.height}px`,
      } as React.CSSProperties),
    [
      placeholderRect?.bottom,
      placeholderRect?.height,
      placeholderRect?.left,
      placeholderRect?.right,
      placeholderRect?.top,
      placeholderRect?.width,
    ]
  );

  const timeouts = {
    containerIn: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--containerIn'
          )
        )
      : 0,
    containerOut: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--containerOut'
          )
        )
      : 0,
    scrimIn: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--scrimIn'
          )
        )
      : 0,
    scrimOut: rootRef.current
      ? timeoutFromTransitionString(
          getComputedStyle(rootRef.current).getPropertyValue(
            '--transition--scrimOut'
          )
        )
      : 0,
  };

  useLayoutEffect(() => {
    if (!expanded && containerRef && containerRect)
      setPlaceholderRect(containerRect);
  }, [containerRect, expanded]);

  useLayoutEffect(() => {
    return () => {
      if (expanded) document.body.style.removeProperty('overflow');
    };
  }, [expanded]);

  // TODO: Do not render if another item in a list is expanded (from context)

  return (
    <ContainerTransformContext.Provider
      value={{ expanded, rootElementRef: rootRef }}
    >
      {/* Root div including variables */}
      <div className={classes.root} ref={rootRef}>
        {/* Scrim */}
        <CSSTransition
          in={expanded}
          timeout={expanded ? timeouts.scrimIn : timeouts.scrimOut}
          classNames={{
            enter: classes['scrim--enter'],
            enterActive: classes['scrim--enter-active'],
            exit: classes['scrim--exit'],
            exitActive: classes['scrim--exit-active'],
          }}
          unmountOnExit
          nodeRef={scrimRef}
        >
          <div
            className={classNames(classes.scrim, scrimClassName)}
            ref={scrimRef}
          />
        </CSSTransition>
        {/* Transforming container */}
        <CSSTransition
          in={expanded}
          timeout={expanded ? timeouts.containerIn : timeouts.containerOut}
          classNames={{
            enter: classes['transforming-container--collapsed'],
            enterActive: classNames(
              expandedClassName,
              classes['transforming-container--enter-active'],
              classes['transforming-container--transition']
            ),
            enterDone: classNames(
              expandedClassName,
              classes['transforming-container--enter-active']
            ),
            exit: classNames(
              expandedClassName,
              classes['transforming-container--exit']
            ),
            exitActive: classNames(
              classes['transforming-container--exit-active'],
              classes['transforming-container--transition']
            ),
          }}
          onEntering={() => (document.body.style.overflow = 'hidden')}
          onExited={() => document.body.style.removeProperty('overflow')}
          nodeRef={containerRef}
        >
          <div
            {...props}
            ref={containerRef}
            className={classNames(classes['transforming-container'], className)}
            style={{ ...containerVariables, ...style }}
          />
        </CSSTransition>
        {/* Placeholder container */}
        <CSSTransition
          in={expanded}
          timeout={expanded ? timeouts.containerIn : timeouts.containerOut}
          classNames={{}}
          unmountOnExit
          nodeRef={placeholderContainerRef}
        >
          <div
            ref={placeholderContainerRef}
            style={{
              width: placeholderRect?.width,
              height: placeholderRect?.height,
            }}
          />
        </CSSTransition>
      </div>
    </ContainerTransformContext.Provider>
  );
};

export default ContainerTransform;
