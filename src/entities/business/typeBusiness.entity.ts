import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';
import { Business } from './business.entity';
import { InterestTypeBusiness } from './interestTypeBusiness.entity';

@Entity('type_business', { schema: 'business' })
export class TypeBusiness {
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

  @OneToMany(() => Business, (store) => store)
  business: Business[];

  @OneToMany(() => InterestTypeBusiness, (interests) => interests.interest)
  interests: InterestTypeBusiness[];
}
