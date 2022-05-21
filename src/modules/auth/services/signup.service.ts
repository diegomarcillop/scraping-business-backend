import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import { Person } from '../../../entities/user/person.entity';
import { Rol } from '../../../entities/user/rol.entity';
import { User } from '../../../entities/user/user.entity';
import { SignupDTO } from '../dto/signup.dto';
import { TokenService } from './token.service';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(Rol, 'user')
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person, 'user')
    private readonly personRepository: Repository<Person>,
    private readonly tokenService: TokenService,
  ) {}

  async signupUser(body: SignupDTO) {
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

    await getManager('user').transaction(async (entityManager) => {
      const user = await entityManager.save(
        this.userRepository.create({
          email: body.email,
          phone: body.phone,
          password: body.password,
        }),
      );

      await entityManager.save(
        this.personRepository.create({
          name: body.name,
          lastname: body.lastname,
          phone: body.phone,
          user,
        }),
      );
    });

    return await this.tokenService.serializeToken(body.email);
  }
}
