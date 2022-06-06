export const getYearText = (text) => {
  const items = text.split(' ');
  return items.find((item) => !isNaN(item) && item.length === 4);
};
