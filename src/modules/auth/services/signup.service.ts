import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES } from 'src/@common/constants/roles.constant';
import { Business } from 'src/entities/business/business.entity';
import { BusinessUser } from 'src/entities/business/businessUser.entity';
import { Category } from 'src/entities/user/category.entity';
import { MailService } from 'src/modules/mail/mail.service';
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
    @InjectRepository(Category, 'user')
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Business, 'business')
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(BusinessUser, 'business')
    private readonly businessUserRepository: Repository<BusinessUser>,
    private readonly mailService: MailService,

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
        detail: 'El correo electronico ya está siendo utilizado.',
      };

    const rol = await this.rolRepository.findOne({
      where: { key: ROLES[0].key },
    });

    const category = await this.categoryRepository.findOne({
      where: { id: body.categoryId },
    });

    await getManager('user').transaction(async (entityManager) => {
      const user = await entityManager.save(
        this.userRepository.create({
          email: body.email,
          phone: body.phone,
          password: body.password,
          rol,
          category,
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

      const business = await entityManager.save(
        this.businessRepository.create({
          nit: body.nit,
          name: body.businessName,
        }),
      );

      await entityManager.save(
        this.businessUserRepository.create({
          business,
          user,
        }),
      );
    });

    //send email verify
    await this.mailService.sendEmail({
      templateName: 'verifyEmail',
      email: body.email,
      subject: 'Verificación de cuenta',
      name: body.name,
      code: '',
      url: `${process.env.APP_HOST_CLIENT}/login`,
    });

    //return await this.tokenService.serializeToken(body.email);
  }
}
