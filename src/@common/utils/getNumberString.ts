export const getNumberString = (text, length?) => {
  if (text) {
    const items = text.replace(',', '').split(' ');

    if (length)
      return parseInt(
        items.find((item) => !isNaN(item) && item.length === length),
        10,
      );

    const str = items.find((item) => !isNaN(item));

    if (str) return parseInt(str?.slice(0, 4), 10);
  }
};
