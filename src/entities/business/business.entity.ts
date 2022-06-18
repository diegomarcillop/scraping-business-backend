import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';

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
}
