import { type ButtonHTMLAttributes, type FC } from 'react';

import { useGetCurrencyRates } from '@/api';
import { Text } from '@/components/ui';
import { formatNumber } from '@/utils';

import classes from './Summary.module.css';

type SummaryProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  mainCurrency: string;
  mainAmount: number;
  secondaryCurrency: string;
  secondaryAmount: number;
};

export const Summary: FC<SummaryProps> = ({
  className,
  mainAmount,
  mainCurrency,
  secondaryAmount,
  secondaryCurrency,
}) => {
  const { isRefetching: isRefetchingCurrencies } = useGetCurrencyRates();

  const totalClasses = `${classes['summary-container']} ${className}`;

  if (isRefetchingCurrencies) {
    return (
      <div className={totalClasses}>
        <Text color="white">Please wait while updating rates</Text>
      </div>
    );
  }

  if (
    secondaryCurrency === '' ||
    mainCurrency === '' ||
    isNaN(secondaryAmount) ||
    isNaN(mainAmount)
  ) {
    return (
      <div className={totalClasses}>
        <Text color="white">Please fill the form</Text>
      </div>
    );
  }

  return (
    <div className={totalClasses}>
      <Text color="white">
        {formatNumber(mainAmount)} {mainCurrency} Equals
      </Text>

      <Text kind="bold" color="white">
        {formatNumber(secondaryAmount)} {secondaryCurrency}
      </Text>
    </div>
  );
};
