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

    const languages = publications.reduce(
      (accumulator, value) => ({
        ...accumulator,
        [value?.language?.name]: (accumulator[value?.language?.name] || 0) + 1,
      }),
      {},
    );

    const origins = publications.reduce(
      (accumulator, value) => ({
        ...accumulator,
        [value?.origin]: (accumulator[value?.origin] || 0) + 1,
      }),
      {},
    );

    filters.type = getConvertArrayObject(type);
    filters.journals = getConvertArrayObject(journals);
    filters.years = getConvertArrayObject(years);
    filters.languages = getConvertArrayObject(languages);
    filters.origins = getConvertArrayObject(origins);

    return filters;
  }
}
