import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Person } from './person.entity';
import { State } from '../enums/states.enum';
import { Favorite } from '../search/favorite.entity';
import { History } from '../search/history.entity';
import { Rol } from './rol.entity';
import { Category } from './category.entity';

@Entity('user')
@Unique(['email', 'phone'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { nullable: true, length: 30 })
  phone: string;

  @Column('character varying', { length: 200, nullable: true })
  email: string;

  @Column('character varying', { length: 250, nullable: true })
  password: string;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @Column('character varying', { nullable: true, length: 100 })
  code: string;

  @Column('varchar', { nullable: true })
  photo: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Person, (person) => person.user)
  person: Person;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => History, (interests) => interests.user)
  history: History[];

  @ManyToOne(() => Category, (category) => category.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_category' })
  category: Category;

  @ManyToOne(() => Rol, (rol) => rol.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_role' })
  rol: Rol;
}
