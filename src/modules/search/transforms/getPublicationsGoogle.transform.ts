/* eslint-disable @typescript-eslint/no-var-requires */
const LanguageDetect = require('languagedetect');

import { LANGUAGES } from 'src/@common/constants/language.constant';
import { getNumberString } from 'src/@common/utils/getNumberString';
import { getTypePublication } from 'src/@common/utils/getTypePublication';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const countWords = require('count-words');
const lngDetector = new LanguageDetect();

export const getPublicationsGoogle = (publications) => {
  return (
    publications?.map((item, index) => ({
      ...item,
      year: getNumberString(item.year, 4),
      type: getTypePublication(item.title),
      quotes: getNumberString(item.quotes),
      words: countWords(`${item.description}`),
      language: LANGUAGES.find(
        (language) => language.key === lngDetector.detect(item.title, 2)[0][0],
      ),
      code: `${item.origin}${index}${item.title?.length}`,
    })) || []
  );
};
