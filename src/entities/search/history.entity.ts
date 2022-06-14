import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { State } from '../enums/states.enum';

@Entity('history', { schema: 'search' })
export class History {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  text: string;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @ManyToOne(() => User, (user) => user.history, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_user' })
  user: User;
}
