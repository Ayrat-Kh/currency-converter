type FormatNumberParams = {
  maximumFractionDigits?: number;
};

export const formatNumber = (
  value: number,
  { maximumFractionDigits = 2 }: FormatNumberParams | undefined = {},
): string => {
  return Intl.NumberFormat(undefined, {
    maximumFractionDigits,
  }).format(value);
};
