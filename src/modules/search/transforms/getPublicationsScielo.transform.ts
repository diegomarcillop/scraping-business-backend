const LanguageDetect = require('languagedetect');

import { getTypePublication } from 'src/@common/utils/getTypePublication';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { getCleanAuthorsStr } from 'src/@common/utils/getCleanAuthorsStr';
import { LANGUAGES } from 'src/@common/constants/language.constant';

const lngDetector = new LanguageDetect();

export const getPublicationsScielo = (publications) => {
  return publications.map((item) => ({
    ...item,
    year: getNumberString(item.year, 4),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
    authors: getCleanAuthorsStr(item.authors),
    journal: item.journal.replaceAll('\n', '').trim(),
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
  }));
};
