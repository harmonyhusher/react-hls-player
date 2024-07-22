import React from 'react';

import { useUnit } from 'effector-react';

import { useDragProgressBar } from '../../../shared/hooks/use-drag-progress-bar';
import { Thumb } from '../thumb/thumb';
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

  const progressBarRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newValue = (clickX / progressBarRef.current.offsetWidth) * duration;
      setDragging(true);
      setDragX(event.clientX);
      setStartDragValue(newValue);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && progressBarRef.current) {
      const newValue = (event.clientX / progressBarRef.current.offsetWidth) * duration;
      console.log(newValue, currentTime, event.clientX, dragStartX);
      setTime(newValue);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newValue = (clickX / progressBarRef.current.offsetWidth) * duration;
      setTime(Math.min(Math.max(newValue, 0), duration));
    }
  };

  useDragProgressBar({ handleMouseMove, handleMouseUp, dragStartValue, dragStartX, duration, isDragging });

  return (
    <div className={s.progress_bar_wrapper}>
      <div className={s.progress_bar} onClick={handleClick} ref={progressBarRef}>
        <div className={s.thumb_progress} style={{ width: `${(currentTime / duration) * 100}%` }} />
        <Thumb handleMouseDown={handleMouseDown} isDragging={isDragging} />
      </div>
    </div>
  );
};
