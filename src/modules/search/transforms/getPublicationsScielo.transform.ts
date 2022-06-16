import { getTypePublication } from 'src/@common/utils/getTypePublication';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { getCleanAuthorsStr } from 'src/@common/utils/getCleanAuthorsStr';

export const getPublicationsScielo = (publications) => {
  return publications.map((item) => ({
    ...item,
    year: getNumberString(item.year, 4),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
    authors: getCleanAuthorsStr(item.authors),
    journal: item.journal.replaceAll('\n', '').trim(),
  }));
};
