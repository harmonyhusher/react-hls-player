import React from 'react';

import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $currentTime, $duration } from '../progress_bar/model';
import s from './thumb.module.scss';

interface IThumbProps {
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

const Thumb = ({ handleMouseDown, isDragging }: IThumbProps) => {
  const [currentTime, duration] = useUnit([$currentTime, $duration]);

  return (
    <div
      className={cn(s.thumb, { [s.is_dragging]: isDragging })}
      onMouseDown={handleMouseDown}
      style={{ left: `${(currentTime / duration) * 100}%` }}
    />
  );
};

export { Thumb };
