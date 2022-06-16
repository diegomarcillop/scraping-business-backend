import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/search/favorite.entity';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDTO } from '../dto/createFavorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite, 'search')
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
  ) {}

  async createFavorite(body: CreateFavoriteDTO) {
    const isUser = await this.userRepository.findOne({
      select: ['id', 'state', 'email'],
      relations: ['person'],
      where: { id: body.userId, state: 'active' },
    });

    if (!isUser)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'El usuario no existe.',
      };
  }
}
