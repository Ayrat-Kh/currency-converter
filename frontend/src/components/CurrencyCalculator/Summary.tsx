import cn from 'classnames';
import { type ButtonHTMLAttributes, type FC } from 'react';

import { useGetCurrencies, useGetCurrencyRates } from '@/api';
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
  const { isLoading: isCurrencyLoading } = useGetCurrencies();

  if (!isRefetchingCurrencies && !isCurrencyLoading) {
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

const SummaryInner: FC<SummaryProps> = ({
  secondaryAmount,
  secondaryCurrency,
  mainAmount,
  mainCurrency,
}) => {
  if (
    secondaryCurrency === '' ||
    mainCurrency === '' ||
    isNaN(secondaryAmount) ||
    isNaN(mainAmount)
  ) {
    return (
      <div className={classes['summary-main_currency']}>
        <Text light="white">Please fill the form</Text>
      </div>
    );
  }

  return (
    <>
      <Text color="light" className={classes['summary-main_currency']}>
        {formatNumber(mainAmount)} {mainCurrency} Equals
      </Text>

      <Text
        kind="bold"
        color="light"
        className={classes['summary-secondary_currency']}
      >
        {formatNumber(secondaryAmount)} {secondaryCurrency}
      </Text>
    </>
  );
};

export const Summary: FC<SummaryProps> = ({
  className,
  ...summaryInnerProps
}) => {
  const totalClasses = cn(classes['summary-container'], className);

  return (
    <div className={totalClasses}>
      <SummaryInner {...summaryInnerProps} />

      <SummaryLoader />
    </div>
  );
};
