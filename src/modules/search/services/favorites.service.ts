import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/entities/enums/states.enum';
import { Favorite } from 'src/entities/search/favorite.entity';
import { Publication } from 'src/entities/search/publication.entity';
import { TypePublication } from 'src/entities/search/typePublication.entity';
import { User } from 'src/entities/user/user.entity';
import { getManager, Repository } from 'typeorm';
import { CreateFavoriteDTO } from '../dto/createFavorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite, 'search')
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Publication, 'search')
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(TypePublication, 'search')
    private readonly typePublicationRepository: Repository<TypePublication>,
  ) {}

  async create(body: CreateFavoriteDTO) {
    let favorite: any = {};
    const user = await this.userRepository.findOne({
      select: ['id', 'state', 'email'],
      relations: ['person'],
      where: { id: body.userId, state: 'active' },
    });

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'El usuario no existe.',
      };

    await getManager('search').transaction(async (entityManager) => {
      const objectPublication: any = {
        title: body.title,
        siteUrl: body.siteUrl,
        description: body.description,
        origin: body.origin,
        journal: body.journal,
        authors: body.authors,
        year: body.year,
        quotes: body.quotes,
      };

      let type: any;
      if (body.typeKey) {
        type = await this.typePublicationRepository.findOne({
          where: { key: body.typeKey },
        });

        objectPublication.type = type;
      }

      const newPublication: any = await entityManager.save(
        this.publicationRepository.create({
          ...objectPublication,
        }),
      );

      favorite = await entityManager.save(
        this.favoriteRepository.create({
          user,
          publication: newPublication,
          state: State.Active,
        }),
      );

      delete favorite.user;
    });

    return favorite;
  }

  async findAll() {
    const queryBuilder = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .select(['favorite.id', 'favorite.state', 'favorite.createdAt'])
      .leftJoinAndSelect('favorite.publication', 'publication')
      .leftJoinAndSelect('publication.type', 'type')
      .where("publication.state = 'active' AND favorite.state = 'active'");

    const data = await queryBuilder.getMany();
    return data;
  }

  async delete(id: number) {
    const favorite = await this.favoriteRepository.findOne(id);

    if (!favorite)
      return {
        error: 'FAVORITE_NOT_EXIST',
        detail: 'El registro no se  encuentra registrado.',
      };

    await this.favoriteRepository.update(id, { state: State.Delete });
  }
}
