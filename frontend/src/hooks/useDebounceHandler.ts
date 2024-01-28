import { useEffect, useMemo, useRef } from 'react';

import { debounce } from '@/utils/debounce';

export const useDebounceHandler = <
  TFn extends (...args: Parameters<TFn>) => unknown,
>(
  fn: TFn,
  debounceTime: number,
) => {
  const fnRef = useRef(fn);

  const { cancel, debouncedFn } = useMemo(() => {
    return debounce(fnRef.current, debounceTime);
  }, [debounceTime]);

  useEffect(() => {
    return () => cancel();
  }, []);

  return debouncedFn;
};
