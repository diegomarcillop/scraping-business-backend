import { getNumberString } from 'src/@common/utils/getNumberString';
import { getTypePublication } from 'src/@common/utils/getTypePublication';

const countWords = require('count-words');

export const getPublicationsGoogle = (publications) => {
  return (
    publications?.map((item) => ({
      ...item,
      year: getNumberString(item.year, 4),
      type: getTypePublication(item.title),
      quotes: getNumberString(item.quotes),
      words: countWords(`${item.description}`),
    })) || []
  );
};
