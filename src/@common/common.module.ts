import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { CryptoService } from './services/crypto.service';
import { TokenService } from '../modules/auth/services/token.service';

import { Person } from 'src/entities/user/person.entity';
import { User } from 'src/entities/user/user.entity';
import { Rol } from 'src/entities/user/rol.entity';

import { TypePublicationDatabaseDefault } from 'src/@common/database/typePublication.default';
import { TypePublication } from 'src/entities/search/typePublication.entity';
import { RolesDatabaseDefault } from './database/roles.default';
import { CategoryDatabaseDefault } from './database/category.default';
import { Category } from 'src/entities/user/category.entity';
import { Language } from 'src/entities/search/language.entity';
import { LanguageDatabaseDefault } from './database/language.default';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person, Rol, Category], 'user'),
    TypeOrmModule.forFeature([TypePublication, Language], 'search'),
    HttpModule,
  ],
  providers: [
    TypePublicationDatabaseDefault,
    RolesDatabaseDefault,
    CategoryDatabaseDefault,
    LanguageDatabaseDefault,
    CryptoService,
    TokenService,
  ],
  exports: [TokenService, CryptoService],
})
export class CommonModule {}
