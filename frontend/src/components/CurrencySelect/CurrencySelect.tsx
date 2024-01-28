import { type FC } from 'react';

import { useGetCurrencies } from '@/api';
import { Select, type SelectProps } from '@/components/ui';
import { mapCurrencyOptionResponse } from '@/utils';

type CurrencySelectProps = Omit<SelectProps, 'selected' | 'options'> & {
  selectedCurrencyCode: string;
};

export const CurrencySelect: FC<CurrencySelectProps> = ({
  selectedCurrencyCode,
  onChange,
  ...rest
}) => {
  const { data } = useGetCurrencies();

  return (
    <Select
      selected={selectedCurrencyCode}
      options={mapCurrencyOptionResponse(data)}
      {...rest}
      onChange={onChange}
    />
  );
};
