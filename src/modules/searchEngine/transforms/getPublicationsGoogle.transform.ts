import { getTypePublication } from 'src/@common/utils/getTypePublication';
import { getNumberString } from 'src/@common/utils/getNumberString';

export const getPublicationsGoogle = (publications) => {
  return publications.map((item) => ({
    ...item,
    year: getNumberString(item.year, 4),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
  }));
};
