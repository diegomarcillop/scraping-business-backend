import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Business } from '../business/business.entity';
import { State } from '../enums/states.enum';

@Entity('history', { schema: 'search' })
export class History {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  text: string;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @ManyToOne(() => Business, (business) => business.history, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_business' })
  business: Business;
}
