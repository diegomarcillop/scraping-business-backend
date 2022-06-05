import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { State } from '../enums/states.enum';
import { Interest } from './interest.entity';
import { TypeBusiness } from './typeBusiness.entity';

@Entity('interest_type_business', { schema: 'business' })
export class InterestTypeBusiness {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Interest, (interest) => interest.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_interest' })
  interest: Interest;

  @ManyToOne(() => TypeBusiness, (typeBusiness) => typeBusiness.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_type_business' })
  typeBusiness: TypeBusiness;
}
