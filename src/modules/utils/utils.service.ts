import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/entities/user/category.entity';
import { State } from 'src/entities/enums/states.enum';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(Category, 'user')
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    const data = await this.categoryRepository.find({
      where: { state: State.Active },
    });

    return data;
  }
}
