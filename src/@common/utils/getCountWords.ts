import { getConvertArrayObject } from './getConvertObjectArray';
import { orderArrayObjectASC } from './orderArrayObject';

const countWords = require('count-words');

export const getCountWords = (text) => {
  let result = countWords(text);
  result = getConvertArrayObject(result);
  result = orderArrayObjectASC(result, 'value');

  result = result.filter(
    (item) => item.name.length > 3 && isNaN(item.name) && item.value > 1,
  );
  return result;
};
