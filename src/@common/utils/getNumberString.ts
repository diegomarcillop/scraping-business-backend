export const getNumberString = (text, length?) => {
  const items = text.split(' ');

  if (length)
    return parseInt(
      items.find((item) => !isNaN(item) && item.length === length),
      10,
    );

  return parseInt(
    items.find((item) => !isNaN(item)),
    10,
  );
};
