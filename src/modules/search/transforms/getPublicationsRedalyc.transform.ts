const LanguageDetect = require('languagedetect');

import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getCleanStr } from 'src/@common/utils/getCleanAuthorsStr';
import { getCountWords } from 'src/@common/utils/getCountWords';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { getTypePublication } from 'src/@common/utils/getTypePublication';

const lngDetector = new LanguageDetect();

export const getPublicationsRedalyc = (publications) => {
  return publications.map((item) => ({
    ...item,
    description: getCleanStr(item.description),
    year: getNumberString(item.year),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
    words: getCountWords(`${item.description || item.title}`).slice(0, 4),
    journal: item.journal.replaceAll(',', '').trim(),
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
  }));
};
