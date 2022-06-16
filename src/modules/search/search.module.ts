import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/search/favorite.entity';
import { User } from 'src/entities/user/user.entity';

import { SearchController } from './search.controller';
import { FavoritesService } from './services/favorites.service';
import { SearchEngineService } from './services/searchEngine.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite], 'search'),
    TypeOrmModule.forFeature([User], 'user'),
  ],
  controllers: [SearchController],
  providers: [SearchEngineService, FavoritesService],
})
export class SearchModule {}
