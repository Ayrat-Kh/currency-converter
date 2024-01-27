type GetNormalizedNumberFromStringParams = {
  maximumFractionDigits?: number;
};

export const getNormalizedNumber = (
  value: number,
  { maximumFractionDigits = 2 }: GetNormalizedNumberFromStringParams,
) => {
  return Number(
    Math.round(parseFloat(`${value}e${maximumFractionDigits}`)) +
      `e-${maximumFractionDigits}`,
  );
};
