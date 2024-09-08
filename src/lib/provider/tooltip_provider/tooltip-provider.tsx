import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './tooltip-provider.scss';
import { useWindowSize } from '@uidotdev/usehooks';

import { Tooltip } from '../../../shared/components/tooltip/tooltip';
import { EElementsIds } from '../../../shared/constants/e-elements-ids';
import { useIsMobile } from '../../../shared/constants/use-platform';

export const TooltipProvider = ({
  children,
  boundary,
  text,
  type = 'mouseover',
}: {
  children: ReactNode;
  boundary?: ReactNode;
  text?: string;
  type?: 'mouseover' | 'click';
}) => {
  const [on, setOn] = useState<boolean>(false);

  const isMobile = useIsMobile();
  const { width } = useWindowSize();

  const boundaryRef = useRef<HTMLDivElement | null>(null);

  const handleOpenTooltip = useCallback(() => {
    setOn(true);
  }, []);

  const handleCloseTooltip = useCallback(() => {
    setOn(false);
  }, []);

  const handlePosition = () => {
    if (!boundaryRef.current) {
      return;
    }

    const rect = boundaryRef.current.getBoundingClientRect();

    if (rect && width && rect.right > width) {
      boundaryRef.current.style.right = '0%';
    }
  };

  useLayoutEffect(() => {
    if (on) {
      handlePosition();
    }
  }, [on]);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div
      id={EElementsIds.TOOLTIP_PROVIDER}
      onMouseLeave={handleCloseTooltip}
      onMouseOver={handleOpenTooltip}
      tabIndex={0}
    >
      {(boundary || text) && (
        <CSSTransition
          classNames="tooltip"
          id={EElementsIds.TOOLTIP_CONTAINER}
          in={on}
          mountOnEnter
          onEntering={handlePosition}
          timeout={100}
          unmountOnExit
        >
          <div className="tooltip_container" ref={boundaryRef}>
            {boundary || <Tooltip text={text || ''} />}
          </div>
        </CSSTransition>
      )}
      {children}
    </div>
  );
};
