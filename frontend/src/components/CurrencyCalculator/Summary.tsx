import cn from 'classnames';
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

export const SummaryLoader: FC = () => {
  const { isRefetching: isRefetchingCurrencies } = useGetCurrencyRates();

  if (!isRefetchingCurrencies) {
    return null;
  }

  return (
    <img
      src="/loader-icon.svg"
      alt="Loader icon"
      className={classes['summary-loader']}
    />
  );
};

export const Summary: FC<SummaryProps> = ({
  className,
  mainAmount,
  mainCurrency,
  secondaryAmount,
  secondaryCurrency,
}) => {
  const totalClasses = cn(classes['summary-container'], className);

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
      <Text color="white" className={classes['summary-main_currency']}>
        {formatNumber(mainAmount)} {mainCurrency} Equals
      </Text>

      <Text
        kind="bold"
        color="white"
        className={classes['summary-secondary_currency']}
      >
        {formatNumber(secondaryAmount)} {secondaryCurrency}
      </Text>

      <SummaryLoader />
    </div>
  );
};
