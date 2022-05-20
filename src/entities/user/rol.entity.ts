import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol', { schema: 'user' })
export class Rol {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying')
  key: string;

  @Column('character varying')
  name: string;

  /*   @OneToMany(type => UserRol, userRol => userRol.rol)
    users: UserRol[];
  
    @OneToMany(type => Stakeholder, stakeholder => stakeholder.rol)
    stakeholder: Stakeholder[]; */
}
