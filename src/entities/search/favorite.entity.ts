import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Business } from '../business/business.entity';
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

  @ManyToOne(() => Business, (business) => business.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_business' })
  business: Business;

  @ManyToOne(() => Publication, (publication) => publication.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_publication' })
  publication: Publication;
}
