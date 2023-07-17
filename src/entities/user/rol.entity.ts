import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  key: string;

  @Column('character varying')
  name: string;

  @OneToMany(() => User, (user) => user.rol)
  users: User[];
}
