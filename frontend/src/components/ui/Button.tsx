import cn from 'classnames';
import { type ButtonHTMLAttributes, type FC } from 'react';

import classes from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  ghost: 'button-ghosted',
  primary: '',
};

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
  const totalClasses = [
    classes['button'],
    classes[variantClasses[variant]],
    className,
  ];

  return <button className={cn(totalClasses)} {...props} />;
};
