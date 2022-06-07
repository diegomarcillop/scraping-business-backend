import { TYPES_PUBLICATION } from '../constants/typePublication.constant';

export const getTypePublication = (str) => {
  str = str.toUpperCase();

  return TYPES_PUBLICATION.find((item) =>
    str.includes(item.name.toUpperCase()),
  );
};
