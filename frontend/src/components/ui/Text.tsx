import cn from 'classnames';
import { type FC, HTMLAttributes, type LabelHTMLAttributes } from 'react';

import classes from './Text.module.css';

type TextVariant = 'base' | 'base1' | 'base2' | 'h1';

const variantClasses: Record<TextVariant, string> = {
  base: 'text-base',
  base1: 'text-base1',
  base2: 'text-base2',
  h1: 'text-h1',
};

type TextColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'white';

const colorClasses: Record<TextColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  error: 'text-error',
  white: 'text-white',
};

type TextKind = 'normal' | 'semibold' | 'bold';

const kindClasses: Record<TextKind, string> = {
  normal: 'text-normal',
  semibold: 'text-semibold',
  bold: 'text-bold',
};

type TextProps = (
  | (LabelHTMLAttributes<HTMLLabelElement> & {
      variant?: Exclude<TextVariant, 'h1'>;
      as: 'label';
    })
  | (HTMLAttributes<HTMLElement> & {
      variant?: TextVariant;
      as?: 'p' | 'span';
    })
) & {
  color?: TextColor;
  kind?: TextKind;
};

export const Text: FC<TextProps> = ({
  className,
  variant = 'base',
  color = 'primary',
  as = 'span',
  kind = 'normal',
  ...rest
}) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = [
    classes.label,
    classes[variantClasses[variant]],
    classes[colorClasses[color]],
    classes[kindClasses[kind]],
    className,
  ];

  if (as === 'label') {
    return <label className={cn(totalClasses)} {...rest} />;
  } else {
    const Component = variant === 'h1' ? 'h1' : as;

    return (
      <Component
        className={cn(totalClasses)}
        {...(rest as HTMLAttributes<HTMLElement>)}
      />
    );
  }
};
