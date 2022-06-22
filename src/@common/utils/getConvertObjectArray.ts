import { orderArrayObjectASC } from './orderArrayObject';

export const getConvertArrayObject = (object) => {
  const arr = Object.keys(object).map(function (key) {
    return { name: key, value: object[key] };
  });
  return orderArrayObjectASC(arr, 'value');
};
