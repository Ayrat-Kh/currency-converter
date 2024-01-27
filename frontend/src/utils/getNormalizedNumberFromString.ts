type GetNormalizedNumberFromStringParams = {
  maximumFractionDigits?: number;
};

export const getNormalizedNumberFromString = (
  value: string,
  { maximumFractionDigits = 2 }: GetNormalizedNumberFromStringParams,
) => {
  return Number(
    Math.round(parseFloat(`${value}e${maximumFractionDigits}`)) +
      `e-${maximumFractionDigits}`,
  );
};
