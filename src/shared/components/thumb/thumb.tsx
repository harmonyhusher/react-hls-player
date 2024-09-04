import React, { ComponentProps } from 'react';

import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $currentTime, $duration, $progress } from '../../../lib/layers/progress_layer/model';
import s from './thumb.module.scss';

interface IThumbProps {
  isDragging: boolean;
}

const Thumb = ({ isDragging, ...props }: ComponentProps<'div'> & IThumbProps) => {
  const [progress, duration] = useUnit([$progress, $duration]);

  return (
    <span
      aria-label={'Ползунок'}
      tabIndex={0}
      className={cn(s.thumb, { [s.is_dragging]: isDragging })}
      {...props}
      style={{ left: `${(progress / duration) * 100}%` }}
    />
  );
};

export { Thumb };
