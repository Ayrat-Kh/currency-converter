import cn from 'classnames';
import { type ChangeEventHandler, type FC, useId } from 'react';

import { getNormalizedNumberFromString } from '@/utils';

import classes from './NumberInput.module.css';
import { Text } from './Text';

type NumberInputVariant = 'large';

const variantClasses: Record<NumberInputVariant, string> = {
  large: 'input-large',
};

type NumberInputProps = Omit<
  React.LabelHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  variant?: NumberInputVariant; // add spec for a small, sm
  label: string;
  value: number;
  maximumFractionDigits?: number;
  onChange: (value: number) => void;
};

export const NumberInput: FC<NumberInputProps> = ({
  className,
  label,
  value,
  maximumFractionDigits = 2,
  variant = 'large',
  onChange,
  ...restInputProps
}) => {
  const inputId = useId();

  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = cn(
    classes['input-container'],

    className,
  );

  const inputClassNames: unknown[] = [
    classes.input,
    classes[variantClasses[variant]],
  ];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const val = getNormalizedNumberFromString(ev.target.value, {
      maximumFractionDigits,
    });
    onChange(val);
  };

  return (
    <div className={totalClasses}>
      <Text
        as="label"
        color="secondary"
        variant="base2"
        className={classes['input-label']}
        htmlFor={inputId}
      >
        {label}
      </Text>
      <input
        id={inputId}
        type={'number'}
        className={cn(inputClassNames)}
        value={value || ''}
        onChange={handleChange}
        name="fakenumberinput"
        pattern="\d*.\d"
        {...restInputProps}
      />
    </div>
  );
};
