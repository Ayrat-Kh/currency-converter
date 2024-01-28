import cn from 'classnames';
import { type ButtonHTMLAttributes, type FC } from 'react';

import classes from './Select.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button: FC<ButtonProps> = ({
  className,
  variant = 'primary',
  ...props
}) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = [classes['button'], className];

  switch (variant) {
    case 'ghost':
      totalClasses.push('button--ghosted');
  }

  return <button className={cn(totalClasses)} {...props} />;
};
