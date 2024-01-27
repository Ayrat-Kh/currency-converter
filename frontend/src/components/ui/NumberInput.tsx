import { type ChangeEventHandler, type FC, useId, useRef } from 'react';

import { getNormalizedNumberFromString } from '@/utils';

import { Label } from './Label';
import classes from './NumberInput.module.css';

type NumberInputProps = Omit<
  React.LabelHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  label: string;
  isNumber?: boolean;
  value: number;
  maximumFractionDigits?: number;
  onChange: (value: number) => void;
};

export const NumberInput: FC<NumberInputProps> = ({
  className,
  label,
  isNumber = false,
  value,
  maximumFractionDigits = 2,
  onChange,
  ...restInputProps
}) => {
  // external className only allowed to add margins by parent
  // in any other cases label component should design itself
  const totalClasses = `${classes['input-container']} ${className}`;

  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null); // find a better way

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const val = getNormalizedNumberFromString(ev.target.value, {
      maximumFractionDigits,
    });
    onChange(val);
  };

  const handleParentItemClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={totalClasses} onClick={handleParentItemClick}>
      <Label htmlFor={inputId}>{label}</Label>
      <input
        id={inputId}
        type={isNumber ? 'number' : undefined}
        className={classes.input}
        value={value || ''}
        onChange={handleChange}
        {...restInputProps}
        ref={inputRef}
      />
    </div>
  );
};
