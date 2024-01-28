import { getNormalizedNumber } from './getNormalizedNumber';

type GetNormalizedNumberFromStringParams = {
  maximumFractionDigits?: number;
};

export const getNormalizedNumberFromString = (
  value: string,
  { maximumFractionDigits = 2 }: GetNormalizedNumberFromStringParams,
) => {
  return getNormalizedNumber(parseFloat(value), { maximumFractionDigits });
};
