import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/api';
import { CurrencyCalculator } from '@/components/CurrencyCalculator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyCalculator />
    </QueryClientProvider>
  );
}

export default App;
