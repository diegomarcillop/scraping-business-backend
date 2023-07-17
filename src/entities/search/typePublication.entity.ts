import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enums/states.enum';
import { Publication } from './publication.entity';

@Entity('type_publication')
export class TypePublication {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  nameEnglish: string;

  @Column('character varying')
  key: string;

  @Column('enum', { enum: State, default: State.Active })
  state: State;

  @OneToMany(() => Publication, (publication) => publication.type)
  publications: Publication[];
}
