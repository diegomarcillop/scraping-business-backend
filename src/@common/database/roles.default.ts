import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entities/user/rol.entity';
import { Repository } from 'typeorm';

import { ROLES } from '../constants/roles.constant';

@Injectable()
export class RolesDatabaseDefault {
  constructor(
    @InjectRepository(Rol, 'user')
    private readonly repository: Repository<Rol>,
  ) {
    ROLES.map((type) => this.create(type));
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
