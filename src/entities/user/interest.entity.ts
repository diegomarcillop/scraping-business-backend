import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';
import { InterestCategory } from './interestCategory.entity';

@Entity('interest')
export class Interest {
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

  @OneToMany(() => InterestCategory, (interest) => interest.category)
  category: InterestCategory[];
}
