import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user/user.entity';
import { UpdateProfile } from './dto/updateProfile.dto';
import { Person } from 'src/entities/user/person.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person, 'user')
    private readonly personRepository: Repository<Person>,
  ) {}

  async getProfile(id: number) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.phone'])
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.rol', 'rol')
      .leftJoinAndSelect('user.category', 'category')
      .where("user.state = 'active' AND user.id = :id", { id })
      .getOne();

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };

    return user;
  }

  async updateProfile(id: number, body: UpdateProfile) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.phone'])
      .leftJoinAndSelect('user.person', 'person')
      .where("user.state = 'active' AND user.id = :id", { id })
      .getOne();

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };

    const objectUpdate = {
      name: body.name || user.person.name,
      lastname: body.lastname || user.person.lastname,
      phone: body.phone || user.person.phone,
      document: body.document || user.person.document,
    };

    await this.userRepository.update(user.id, {
      phone: objectUpdate.phone,
      email: body.email || user.email,
    });
    await this.personRepository.update(user.person.id, objectUpdate);
  }
}
