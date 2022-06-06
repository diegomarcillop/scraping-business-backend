import { getYearText } from 'src/@common/utils/getYearText';

export const getPublicationsGoogle = (publications) => {
  return publications.map((item) => ({
    ...item,
    year: getYearText(item.author),
  }));
};
