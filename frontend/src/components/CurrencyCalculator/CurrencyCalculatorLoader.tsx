import { type FC } from 'react';

import classes from './CurrencyCalculatorContainer.module.css';

export const CurrencyCalculatorLoader: FC = () => {
  return (
    <div className={classes['calc-container']}>
      <p>Loading...</p>
    </div>
  );
};
