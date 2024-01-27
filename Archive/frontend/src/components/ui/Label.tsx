import { type FC } from 'react';

import classes from './Label.module.css';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FC<LabelProps> = ({ className, ...rest }) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = `${classes.label} ${className}`;

  return <label className={totalClasses} {...rest} />;
};
