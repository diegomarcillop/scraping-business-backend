import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user/user.entity';
import { TokenService } from './token.service';
import { LoginDTO } from '../dto/login.dto';
import { State } from 'src/entities/enums/states.enum';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'state', 'code'],
      where: body,
    });

    if (!user)
      throw new BadRequestException({
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      });

    if (body.code) {
      if (user.state === State.Unverified && user.code === body.code) {
        await this.userRepository.update(user.id, {
          code: undefined,
          state: State.Active,
        });
      }
    }

    return await this.tokenService.serializeToken(user.email);
  }
}
