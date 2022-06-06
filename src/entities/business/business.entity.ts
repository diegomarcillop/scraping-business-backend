import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';
import { Favorite } from '../search/favorite.entity';
import { History } from '../search/history.entity';
import { TypeBusiness } from './typeBusiness.entity';

@Entity('business', { schema: 'business' })
export class Business {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying', { nullable: true })
  address: string;

  @Column('character varying', { nullable: true })
  nit: string;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => TypeBusiness, (typeBusiness) => typeBusiness.business)
  typeBusiness: TypeBusiness[];

  @OneToMany(() => History, (interests) => interests.business)
  history: History[];

  @OneToMany(() => Favorite, (favorite) => favorite.business)
  favorites: Favorite[];
}
