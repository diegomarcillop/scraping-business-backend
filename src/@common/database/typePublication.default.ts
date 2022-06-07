import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypePublication } from '../../entities/search/typePublication.entity';
import { TYPES_PUBLICATION } from '../constants/typePublication.constant';

@Injectable()
export class TypePublicationDatabaseDefault {
  constructor(
    @InjectRepository(TypePublication, 'search')
    private readonly repository: Repository<TypePublication>,
  ) {
    TYPES_PUBLICATION.map((type) => this.create(type));
  }

  async create(_object) {
    const isExist = await this.repository.findOne({
      where: { name: _object.name },
    });

    if (isExist) return;

    const _new = this.repository.create(_object);

    return this.repository.save(_new);
  }
}
