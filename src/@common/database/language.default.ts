import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Language } from 'src/entities/search/language.entity';
import { Repository } from 'typeorm';

import { LANGUAGES } from '../constants/language.constant';

@Injectable()
export class LanguageDatabaseDefault {
  constructor(
    @InjectRepository(Language, 'search')
    private readonly repository: Repository<Language>,
  ) {
    LANGUAGES.map((language) => this.create(language));
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
