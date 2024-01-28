import cn from 'classnames';
import {
  type ChangeEventHandler,
  type FC,
  type HTMLAttributes,
  useId,
} from 'react';

import classes from './Select.module.css';
import { Text } from './Text';

type SelectVariant = 'large';

const variantClasses: Record<SelectVariant, string> = {
  large: 'select-large',
};

type SelectOption = { label: string; value: string }; // for simplicity restricted string type, ideally it should be generic type

export type SelectProps = Omit<
  HTMLAttributes<HTMLSelectElement>,
  'onChange'
> & {
  label: string;
  options: SelectOption[];
  variant?: SelectVariant; // add spec for a small, sm
  selected: string;
  onChange: (selected: string) => void;
};

export const Select: FC<SelectProps> = ({
  label,
  className,
  variant = 'large', // add spec for a small, sm
  options,
  selected,
  onChange,
  ...rest
}) => {
  const inputId = useId();

  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = [classes['select-container'], className];
  const selectClassNames: unknown[] = [
    classes.select,
    classes[variantClasses[variant]],
  ];

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={cn(totalClasses)}>
      <Text
        as="label"
        color="secondary"
        variant="base2"
        className={classes['select-label']}
        htmlFor={inputId}
      >
        {label}
      </Text>

      <select
        id={inputId}
        value={selected}
        className={cn(selectClassNames)}
        {...rest}
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
