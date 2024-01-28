import { Text } from '@/components/ui';

import classes from './CurrencyCalculatorContainer.module.css';
import { CurrencyCalculatorInner } from './CurrencyCalculatorInner';

export const CurrencyCalculatorContainer = () => {
  return (
    <div className={classes['calc-container']}>
      <Text variant="h1" className={classes['calc-header']}>
        Currency Converter
      </Text>
      <CurrencyCalculatorInner />
    </div>
  );
};
