import React, { ComponentProps, ReactNode } from 'react';

import cn from 'classnames';

import cs from './button.module.scss';

type Props = {
  icon?: ReactNode | JSX.Element | any;
  children?: ReactNode;
};

export const Button = ({ icon, children, ...props }: Props & ComponentProps<'button'>) => {
  return (
    <button {...props} className={cn(cs.button, { [cs.icon]: icon })}>
      {' '}
      {icon && icon} {children && children}
    </button>
  );
};
