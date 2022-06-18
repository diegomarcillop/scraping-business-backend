import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from 'src/entities/user/category.entity';
import { Repository } from 'typeorm';

import { CATEGORY } from '../constants/category.constant';

@Injectable()
export class CategoryDatabaseDefault {
  constructor(
    @InjectRepository(Category, 'user')
    private readonly repository: Repository<Category>,
  ) {
    CATEGORY.map((type) => this.create(type));
  }

  async create(_object) {
    const isExist = await this.repository.findOne({
      where: { key: _object.key },
    });

    if (isExist) return;

    const _new = this.repository.create(_object);

    return this.repository.save(_new);
  }
}
