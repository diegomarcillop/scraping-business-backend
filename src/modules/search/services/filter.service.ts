import { Injectable } from '@nestjs/common';
import { getConvertArrayObject } from 'src/@common/utils/getConvertObjectArray';

@Injectable()
export class FilterService {
  async getFilters(publications: any) {
    const filters: any = {};
    const years = publications.reduce(
      (accumulator, value) => ({
        ...accumulator,
        [value.year]: (accumulator[value.year] || 0) + 1,
      }),
      {},
    );
    const journals = publications.reduce(
      (accumulator, value) => ({
        ...accumulator,
        [value.journal]: (accumulator[value.journal] || 0) + 1,
      }),
      {},
    );

    const type = publications.reduce(
      (accumulator, value) => ({
        ...accumulator,
        [value?.type?.name]: (accumulator[value?.type?.name] || 0) + 1,
      }),
      {},
    );

    filters.type = getConvertArrayObject(type);
    filters.journals = getConvertArrayObject(journals);
    filters.years = getConvertArrayObject(years);

    return filters;
  }
}
