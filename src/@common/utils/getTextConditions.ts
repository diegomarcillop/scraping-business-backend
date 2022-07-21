export const getTextConditions = (str) => {
  let newStr = str.replaceAll(' y ', ' AND ');
  newStr = newStr.replaceAll(' Y ', ' AND ');
  newStr = newStr.replaceAll(' o ', ' OR ');
  newStr = newStr.replaceAll(' O ', ' OR ');

  return newStr;
};
