import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Person } from './person.entity';
import { State } from '../enums/states.enum';

@Entity('user', { schema: 'user' })
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
}
