import { type FC } from 'react';

import { useGetCurrencies } from '@/api';
import { Select, type SelectProps } from '@/components/ui';

type CurrencySelectProps = Omit<SelectProps, 'selected' | 'options'> & {
  selectedCurrencyCode: string;
};

export const CurrencySelect: FC<CurrencySelectProps> = ({
  selectedCurrencyCode,
  onChange,
  ...rest
}) => {
  const { data } = useGetCurrencies();

  const optionObject = data ?? {};
  const options = Object.entries(optionObject).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <Select
      selected={selectedCurrencyCode}
      options={options}
      {...rest}
      onChange={onChange}
    />
  );
};
