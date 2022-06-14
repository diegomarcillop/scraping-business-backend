export const getCleanAuthorsStr = (str) => {
  return str
    .replaceAll('\n', '')
    .replaceAll('.', '')
    .split(';')
    .map((item) => item.trim().replace(',', ''))
    .join(', ');
};
