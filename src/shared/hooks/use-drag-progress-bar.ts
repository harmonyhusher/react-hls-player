import React from 'react';

interface IUseProgressBar {
  isDragging: boolean;
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  dragStartX: number;
  dragStartValue: number;
  duration: number;
}

const useDragProgressBar = ({
  isDragging,
  handleMouseMove,
  handleMouseUp,
  dragStartValue,
  dragStartX,
  duration,
}: IUseProgressBar) => {
  React.useEffect(() => {
    if (isDragging) {
      const handleMouseMoveDocument = (event: MouseEvent) => {
        handleMouseMove(event as any);
      };

      document.addEventListener('mousemove', handleMouseMoveDocument);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMoveDocument);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStartX, dragStartValue, duration, handleMouseMove]);
};

export { useDragProgressBar };
