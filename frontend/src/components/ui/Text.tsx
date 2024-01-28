import cn from 'classnames';
import { type FC } from 'react';

import classes from './Text.module.css';

type TextProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Text: FC<TextProps> = ({ className, ...rest }) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = cn([classes.label, className]);

  return <label className={totalClasses} {...rest} />;
};
