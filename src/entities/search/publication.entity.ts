import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { State } from '../enums/states.enum';

import { Favorite } from './favorite.entity';
import { TypePublication } from './typePublication.entity';

@Entity('publication', { schema: 'search' })
export class Publication {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  title: string;

  @Column('character varying')
  description: string;

  @Column('character varying')
  website: string;

  @Column('character varying')
  authors: string;

  @Column('numeric')
  quotes: number;

  @Column('numeric')
  journal: number;

  @Column('character varying')
  origin: string;

  @Column('numeric')
  year: number;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.publication)
  favorites: Favorite[];

  @ManyToOne(() => TypePublication, (type) => type.publications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_type' })
  type: TypePublication;
}
