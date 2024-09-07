import { useState, useEffect, ReactNode, useLayoutEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import './tooltip-provider.scss';
import { EElementsIds } from '../../../shared/constants/e-elements-ids';
import { useIsMobile } from '../../../shared/constants/use-platform';
import { Tooltip } from '../../../shared/components/tooltip/tooltip';
import { useWindowSize } from '@uidotdev/usehooks';

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

  const boundaryRef = useRef(null);

  const handleOpenTooltip = useCallback(() => {
    setOn(true);
  }, []);

  const handleCloseTooltip = useCallback(() => {
    setOn(false);
  }, []);

  const handlePosition = () => {
    const element = document.getElementById(EElementsIds.TOOLTIP_CONTAINER);

    if (!element || !boundaryRef.current) {
      return;
    }

    const rect = element.getBoundingClientRect();

    if (rect && width && rect.right > width) {
      element.style.right = '0%';
    }
  };

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div
      tabIndex={0}
      onMouseLeave={handleCloseTooltip}
      onMouseOver={handleOpenTooltip}
      id={EElementsIds.TOOLTIP_PROVIDER}
    >
      {(boundary || text) && (
        <CSSTransition
          ref={boundaryRef}
          id={EElementsIds.TOOLTIP_CONTAINER}
          in={on}
          timeout={500}
          classNames="tooltip"
          unmountOnExit
          onEntering={handlePosition}
        >
          <div ref={boundaryRef} className="tooltip_container">
            {boundary || <Tooltip text={text || ''} />}
          </div>
        </CSSTransition>
      )}
      {children}
    </div>
  );
};
