import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';
import { User } from './user.entity';
import { InterestCategory } from './interestCategory.entity';

@Entity('category', { schema: 'user' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying', { nullable: true })
  key: string;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => User, (store) => store.category)
  user: User[];

  @OneToMany(() => InterestCategory, (interests) => interests.category)
  interests: InterestCategory[];
}
