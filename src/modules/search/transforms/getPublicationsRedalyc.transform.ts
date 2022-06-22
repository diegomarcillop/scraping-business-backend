const LanguageDetect = require('languagedetect');

import { getTypePublication } from 'src/@common/utils/getTypePublication';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getCleanStr } from 'src/@common/utils/getCleanAuthorsStr';

const lngDetector = new LanguageDetect();

export const getPublicationsRedalyc = (publications) => {
  return publications.map((item) => ({
    ...item,
    description: getCleanStr(item.description),
    year: getNumberString(item.year),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
    //authors: getCleanAuthorsStr(item.authors),
    journal: item.journal.replaceAll(',', '').trim(),
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
  }));
};
