import cn from 'classnames';

import cs from './tooltip.module.scss';

export const Tooltip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div aria-label={text} className={cn(cs.tooltip, className)}>
      {text}
    </div>
  );
};
