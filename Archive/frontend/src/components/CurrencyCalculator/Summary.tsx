import { type ButtonHTMLAttributes, type FC } from 'react';

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
  const totalClasses = `${classes['summary-container']} ${className}`;

  if (secondaryCurrency === '' || mainCurrency === '') {
    return (
      <div className={totalClasses}>
        <p>Please select currencies</p>
      </div>
    );
  }

  if (isNaN(secondaryAmount) || isNaN(mainAmount)) {
    return (
      <div className={totalClasses}>
        <p>Please select amount</p>
      </div>
    );
  }

  return (
    <div className={totalClasses}>
      <p>
        {formatNumber(mainAmount)} {mainCurrency} Equals
      </p>
      <b>
        <p>
          {formatNumber(secondaryAmount)} {secondaryCurrency}
        </p>
      </b>
    </div>
  );
};
