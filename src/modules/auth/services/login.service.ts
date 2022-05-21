import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user/user.entity';
import { TokenService } from './token.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'state'],
      where: body,
    });

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };

    return await this.tokenService.serializeToken(user.email);
  }
}
