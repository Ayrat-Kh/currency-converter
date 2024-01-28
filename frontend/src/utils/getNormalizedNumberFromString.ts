type GetNormalizedNumberFromStringParams = {
  maximumFractionDigits?: number;
};

export const getNormalizedNumberFromString = (
  value: string,
  { maximumFractionDigits = 2 }: GetNormalizedNumberFromStringParams,
) => {
  const stripper = RegExp(`\\d*[,.]?\\d{0,${maximumFractionDigits}}`);
  const normalizedValue = stripper.exec(value)?.[0] ?? '';

  return {
    normalizedValue,
    number: parseFloat(normalizedValue.replace(/,/g, '.')),
  };
};
