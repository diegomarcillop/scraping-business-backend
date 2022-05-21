import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../entities/user/user.entity';
import { State } from '../../../entities/enums/states.enum';
import { TokenJwt } from '../../../@common/strategys/jwt.strategy';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
  ) {}

  serializeToken = async (email: string, phone?: string) => {
    const query = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email'])
      .innerJoinAndSelect('user.person', 'person');

    if (email)
      query.where('user.email = :email AND user.state = :state', {
        email,
        state: State.Active,
      });

    const user = await query.getOne();

    if (!user)
      throw new BadRequestException({
        error: 'USER_INACTIVE',
        detail: 'El usuario se encuentra inactivado.',
      });

    const token: TokenJwt = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      person: user.person,
    };

    return token;
  };

  async validateToken(token: TokenJwt): Promise<any> {
    const { id } = token;
    const user = await this.userRepository.findOne({ id, state: State.Active });

    if (!user) {
      throw new UnauthorizedException('invalid or expire token');
    }

    return { ...token };
  }
}
