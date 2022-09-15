// eslint-disable-next-line @typescript-eslint/no-var-requires
const LanguageDetect = require('languagedetect');

import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getCleanStr } from 'src/@common/utils/getCleanAuthorsStr';
import { getCountWords } from 'src/@common/utils/getCountWords';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { getTypePublication } from 'src/@common/utils/getTypePublication';

const lngDetector = new LanguageDetect();

export const getPublicationsScielo = (publications) => {
  return publications.map((item, index) => ({
    title: item.title,
    description: item.description || '',
    year: getNumberString(item.year, 4),
    siteUrl: item.siteUrl,
    journal: item.journal.replaceAll('\n', '').trim() || '',
    origin: item.origin,
    authors: getCleanStr(item.authors) || '',
    idiom:
      LANGUAGES.find(
        (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
      )?.name || 'undefined',
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
    type: getTypePublication(item.title),
    quotes: getNumberString(item.quotes),
    words: getCountWords(`${item.description || item.title}`).slice(0, 4),
    code: `${item.origin}${index}${item.title?.length}`,
  }));
};
