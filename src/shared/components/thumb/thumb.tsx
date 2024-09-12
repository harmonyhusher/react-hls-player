import { ComponentProps } from 'react';

import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $duration, $progress } from '../../../lib/layers/progress_layer/model';
import s from './thumb.module.scss';

interface IThumbProps {
  isDragging: boolean;
}

const Thumb = ({ isDragging, ...props }: ComponentProps<'div'> & IThumbProps) => {
  const [progress, duration] = useUnit([$progress, $duration]);

  return (
    <span
      aria-label={'Ползунок'}
      className={cn(s.thumb, { [s.is_dragging]: isDragging })}
      tabIndex={0}
      {...props}
      style={{ left: `${(progress / duration) * 100}%` }}
    />
  );
};

export { Thumb };
