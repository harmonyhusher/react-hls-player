import { ComponentProps, ReactNode } from 'react';

import cn from 'classnames';

import cs from './container.module.scss';

type TContainerProps = ComponentProps<'div'> & {
  className?: string;
  children: ReactNode;
};

export const Container = ({ className, children, ...props }: TContainerProps) => {
  return (
    <div className={cn(cs.container, className)} {...props}>
      {children}
    </div>
  );
};
