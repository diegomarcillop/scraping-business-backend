// eslint-disable-next-line @typescript-eslint/no-var-requires
const LanguageDetect = require('languagedetect');

import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getCleanStr } from 'src/@common/utils/getCleanAuthorsStr';
import { getNumberString } from 'src/@common/utils/getNumberString';

const lngDetector = new LanguageDetect();

export const getPublicationsLibgen = (publications) => {
  return publications.map((item) => ({
    ...item,
    year: getNumberString(item.year, 4),
    //type: getTypePublication(item.title),
    //quotes: getNumberString(item.quotes),
    //words: getCountWords(`${item.description || item.title}`).slice(0, 4),
    authors: getCleanStr(item.authors),
    journal: item.journal.replaceAll('\n', '').trim(),
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
  }));
};
