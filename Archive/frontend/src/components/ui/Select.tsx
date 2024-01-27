import { type ChangeEventHandler, type FC, useId } from 'react';

import { Label } from './Label';
import classes from './Select.module.css';

type SelectOption = { label: string; value: string }; // for simplicity restricted string type, ideally it should be generic type

export type SelectProps = Omit<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  'onChange'
> & {
  label: string;
  options: SelectOption[];
  selected: string;
  onChange: (selected: string) => void;
};

export const Select: FC<SelectProps> = ({
  label,
  className,
  options,
  selected,
  onChange,
  ...rest
}) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = `${classes['select-container']} ${className}`;

  const inputId = useId();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={totalClasses}>
      <Label htmlFor={inputId} {...rest}>
        {label}
      </Label>

      <select
        id={inputId}
        value={selected}
        className={classes.select}
        onChange={handleChange}
      >
        <option hidden disabled defaultValue=""></option>
        {options.map(({ value, label }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
