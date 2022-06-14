import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { State } from '../enums/states.enum';
import { Publication } from './publication.entity';

@Entity('favorite', { schema: 'search' })
export class Favorite {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_user' })
  user: User;

  @ManyToOne(() => Publication, (publication) => publication.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_publication' })
  publication: Publication;
}
