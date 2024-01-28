import cn from 'classnames';
import {
  type ChangeEventHandler,
  type FC,
  type FocusEventHandler,
  useId,
  useState,
} from 'react';

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
  // this state only controls the value when it was changed
  const [stringView, setStringView] = useState('');
  const [isActive, setIsActive] = useState(false);
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
    const { normalizedValue, number } = getNormalizedNumberFromString(
      ev.target.value,
      {
        maximumFractionDigits,
      },
    );

    setStringView(normalizedValue);

    onChange(number);
  };

  const handleFocus = () => {
    setStringView(isFinite(value) ? value.toString() : '');
    setIsActive(true);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (ev) => {
    setIsActive(false);
    setStringView('');
    restInputProps.onBlur?.(ev);
  };

  // in order to show the right value the component should prioritize the most fresh value:
  //  stringView - most priority, as it means that the user interacted with input
  //  value - props value, it means we show the value from parent and user hasn't interacted yet
  //  empty otherwise
  let displayValue = '';

  if (isFinite(value)) {
    displayValue = value.toString();
  }

  if (isActive) {
    displayValue = stringView;
  }

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
        inputMode="decimal"
        id={inputId}
        className={cn(inputClassNames)}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="fakenumberinput" // avoid password managers
        {...restInputProps}
      />
    </div>
  );
};
