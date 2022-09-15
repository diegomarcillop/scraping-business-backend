// eslint-disable-next-line @typescript-eslint/no-var-requires
const LanguageDetect = require('languagedetect');

import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getCleanStr } from 'src/@common/utils/getCleanAuthorsStr';
import { getNumberString } from 'src/@common/utils/getNumberString';

const lngDetector = new LanguageDetect();

export const getPublicationsLibgen = (publications) => {
  return publications.map((item, index) => ({
    title: item.title,
    description: '',
    year: getNumberString(item.year, 4),
    siteUrl: item.siteUrl,
    journal: item.journal.replaceAll('\n', '').trim(),
    origin: item.origin,
    authors: getCleanStr(item.authors),
    idiom:
      LANGUAGES.find(
        (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
      )?.name || 'undefined',
    language: LANGUAGES.find(
      (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
    ),
    code: `${item.origin}${index}${item.title?.length}`,
  }));
};
