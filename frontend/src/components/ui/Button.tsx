import { type ButtonHTMLAttributes, type FC } from 'react';

import classes from './Select.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = `${classes['button']} ${className}`;

  return <button className={totalClasses} {...props} />;
};
