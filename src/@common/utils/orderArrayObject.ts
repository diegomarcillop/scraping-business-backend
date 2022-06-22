export const orderArrayObjectASC = (array = [], keyValue) => {
  return array.sort((a, b) => {
    if (a[keyValue] < b[keyValue]) return 1;
    if (a[keyValue] > b[keyValue]) return -1;

    return 0;
  });
};
