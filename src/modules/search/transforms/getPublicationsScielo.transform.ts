const LanguageDetect = require('languagedetect');

import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getCleanStr } from 'src/@common/utils/getCleanAuthorsStr';
import { getCountWords } from 'src/@common/utils/getCountWords';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { getTypePublication } from 'src/@common/utils/getTypePublication';

const lngDetector = new LanguageDetect();

export const getPublicationsScielo = (publications) => {
  return publications.map((item) => ({
    ...item,
    year: getNumberString(item.year, 4),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
    words: getCountWords(`${item.description || item.title}`).slice(0, 4),
    authors: getCleanStr(item.authors),
    journal: item.journal.replaceAll('\n', '').trim(),
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
  }));
};
