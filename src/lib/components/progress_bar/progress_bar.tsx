import { useUnit } from 'effector-react';

import {
  $currentTime,
  $dragStartValue,
  $dragStartX,
  $duration,
  $isDragging,
  setCurrentTime,
  setDragStartValue,
  setDragStartX,
  setIsDragging,
} from './model';
import s from './progress_bar.module.scss';

export const ProgressBar = () => {
  const [duration, isDragging, dragStartX, dragStartValue, currentTime] = useUnit([
    $duration,
    $isDragging,
    $dragStartX,
    $dragStartValue,
    $currentTime,
  ]);

  const [setDragging, setStartDragValue, setDragX, setTime] = useUnit([
    setIsDragging,
    setDragStartValue,
    setDragStartX,
    setCurrentTime,
  ]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragX(event.clientX);
    setStartDragValue(currentTime);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = event.clientX - dragStartX;
      const newValue = dragStartValue + (deltaX / event.target.offsetWidth) * 100;
      setTime(newValue);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className={s.progress_bar_wrapper}>
      <div
        className={s.thumb}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ left: `${(currentTime / duration) * 100}%` }}
      />
      <div className={s.progress_bar}>
        <div className={s.thumb_progress} style={{ left: `${currentTime}%` }} />
      </div>
    </div>
  );
};
