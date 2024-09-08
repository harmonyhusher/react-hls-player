import cs from './area.module.scss';

import cn from 'classnames';

interface IAreasProps {
  width: string;
  className?: string;
  type?: 'primary' | 'buffered' | 'progress';
}

export const Area = ({ width, className }: IAreasProps) => {
  return (
    <div
      className={cn(cs.thumb_progress)}
      style={{
        width,
      }}
    />
  );
};
