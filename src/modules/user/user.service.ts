import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user/user.entity';
import { UpdateProfile } from './dto/updateProfile.dto';
import { Person } from 'src/entities/user/person.entity';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { Business } from 'src/entities/business/business.entity';
import { BusinessUser } from 'src/entities/business/businessUser.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person, 'user')
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Business, 'business')
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(BusinessUser, 'business')
    private readonly businessUserRepository: Repository<BusinessUser>,
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

  async getBusiness(id: number) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .where("user.state = 'active' AND user.id = :id", { id })
      .getOne();

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };

    const businessUser: any = await this.businessUserRepository
      .createQueryBuilder('businessUser')
      .leftJoin('businessUser.user', 'user')
      .leftJoinAndSelect('businessUser.business', 'business')
      .where('user.id = :id', { id })
      .getOne();

    return businessUser.business;
  }

  async updateProfile(id: number, body: UpdateProfile) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.phone'])
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.category', 'category')
      .where("user.state = 'active' AND user.id = :id", { id })
      .getOne();

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };

    if (user.email !== body.email) {
      const isUser = await this.userRepository.findOne({
        select: ['id', 'state', 'email'],
        relations: ['person'],
        where: { email: body.email, state: 'active' },
      });

      if (isUser)
        return {
          error: 'EMAIL_IN_USE',
          detail: 'Ese correo electronico ya está siendo utilizado.',
        };
    }

    const objectUpdate = {
      name: body.name || user.person.name,
      lastname: body.lastname || user.person.lastname,
      phone: body.phone || user.person.phone,
      document: body.document || user.person.document,
    };

    await this.userRepository.update(user.id, {
      phone: objectUpdate.phone,
      email: body.email || user.email,
      category: { id: body.categoryId || user.category.id },
    });
    await this.personRepository.update(user.person.id, objectUpdate);
  }

  async updateBusiness(id: number, body: UpdateBusiness) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.phone'])
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.category', 'category')
      .where("user.state = 'active' AND user.id = :id", { id })
      .getOne();

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };

    const businessUser: any = await this.businessUserRepository
      .createQueryBuilder('businessUser')
      .leftJoin('businessUser.user', 'user')
      .leftJoinAndSelect('businessUser.business', 'business')
      .where('user.id = :id', { id })
      .getOne();

    const objectUpdate = {
      name: body.name || businessUser.business.name,
      nit: body.nit || businessUser.business.nit,
    };

    await this.businessRepository.update(
      businessUser.business.id,
      objectUpdate,
    );
  }
}
