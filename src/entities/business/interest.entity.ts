import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';
import { InterestTypeBusiness } from './interestTypeBusiness.entity';

@Entity('interest', { schema: 'business' })
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

  @OneToMany(
    () => InterestTypeBusiness,
    (typeBusiness) => typeBusiness.typeBusiness,
  )
  typeBusiness: InterestTypeBusiness[];
}
