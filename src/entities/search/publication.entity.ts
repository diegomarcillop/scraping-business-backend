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
import { Language } from './language.entity';
import { TypePublication } from './typePublication.entity';

@Entity('publication', { schema: 'search' })
export class Publication {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  title: string;

  @Column('character varying', { nullable: true })
  description: string;

  @Column('character varying')
  siteUrl: string;

  @Column('character varying', { nullable: true })
  authors: string;

  @Column('numeric', { nullable: true })
  quotes: number;

  @Column('character varying', { nullable: true })
  journal: number;

  @Column('character varying')
  origin: string;

  @Column('character varying', { nullable: true })
  code: string;

  @Column('numeric', { nullable: true })
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
    nullable: true,
  })
  @JoinColumn({ name: 'fk_type' })
  type: TypePublication;

  @ManyToOne(() => Language, (language) => language.publications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'fk_language' })
  language: Language;
}
