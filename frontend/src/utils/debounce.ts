export const debounce = <TFn extends (...args: Parameters<TFn>) => any>(
  fn: TFn,
  debounceTimeMs: number,
) => {
  let timeoutId: NodeJS.Timeout;

  const cancel = () => {
    clearTimeout(timeoutId);
  };

  return {
    debouncedFn: (...args: Parameters<TFn>) => {
      cancel();

      timeoutId = setTimeout(fn, debounceTimeMs, ...args);
    },
    cancel,
  };
};
