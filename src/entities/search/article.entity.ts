import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Favorite } from './favorite.entity';

@Entity('article', { schema: 'search' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  title: string;

  @Column('character varying')
  description: string;

  @Column('character varying')
  website: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.article)
  favorites: Favorite[];
}
