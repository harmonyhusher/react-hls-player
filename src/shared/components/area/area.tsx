import cn from 'classnames';

import cs from './area.module.scss';

interface IAreasProps {
  width: string;
  className?: string;
  type?: 'primary' | 'buffered' | 'progress';
}

export const Area = ({ width }: IAreasProps) => {
  return (
    <div
      className={cn(cs.thumb_progress)}
      style={{
        width,
      }}
    />
  );
};
