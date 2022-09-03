import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generateRandomCode } from 'src/@common/utils/generateRandomCode';
import { Person } from 'src/entities/user/person.entity';
import { User } from 'src/entities/user/user.entity';
import { SendCodeDTO } from '../dto/sendCode.dto';
import { VerifyCodeDTO } from '../dto/verifyCode.dto';
import { State } from 'src/entities/enums/states.enum';
import { ChangePasswordDTO } from '../dto/changePassword.dto';

@Injectable()
export class RecoverPasswordService {
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person, 'user')
    private readonly personRepository: Repository<Person>,
  ) {}

  async sendCode(body: SendCodeDTO) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'state'],
      where: { email: body.email },
    });

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electrónico o contraseña no son válidos.',
      };

    const person = await this.personRepository.findOne({
      select: ['id', 'name', 'lastname'],
      where: { user: { id: user.id } },
    });

    const code = generateRandomCode();
    await this.userRepository.update(
      { id: user.id },
      { code: code.toString() },
    );

    return {
      code,
      person,
    };
  }

  async verifyCode(body: VerifyCodeDTO) {
    const { email, code } = body;
    const user = await this.userRepository.findOne({ where: { email, code } });

    if (!user)
      return {
        error: 'CODE_ERROR',
        detail: 'El código no coincide con el que se envio.',
      };

    return { success: 'OK' };
  }

  async changePassword(body: ChangePasswordDTO) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.state'])
      .where('user.email = :email', { email: body.email })
      .getOne();

    if (!user)
      return { error: 'USER_NOT_EXIST', detail: 'El usuario no existe.' };

    if (user.state === State.Inactive)
      return { error: 'USER_INACTIVE', detail: 'El usuario esta inactivo.' };

    await this.userRepository.update(
      { id: user.id },
      { password: body.password, code: null },
    );
  }
}
