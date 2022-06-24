import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/search/favorite.entity';
import { History } from 'src/entities/search/history.entity';
import { Publication } from 'src/entities/search/publication.entity';
import { TypePublication } from 'src/entities/search/typePublication.entity';
import { User } from 'src/entities/user/user.entity';
import { FavoriteController } from './controllers/favorite.controller';
import { HistoryController } from './controllers/history.controller';

import { SearchEngineController } from './controllers/searchEngine.controller';
import { FavoritesService } from './services/favorites.service';
import { FilterService } from './services/filter.service';
import { HistoryService } from './services/history.service';
import { SearchEngineService } from './services/searchEngine.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Favorite, Publication, TypePublication, History],
      'search',
    ),
    TypeOrmModule.forFeature([User], 'user'),
  ],
  controllers: [SearchEngineController, FavoriteController, HistoryController],
  providers: [
    SearchEngineService,
    FavoritesService,
    FilterService,
    HistoryService,
  ],
})
export class SearchModule {}
