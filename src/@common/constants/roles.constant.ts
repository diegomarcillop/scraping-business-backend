import { State } from 'src/entities/enums/states.enum';

export const ROLES = [
  { name: 'propietario', key: 'owner', state: State.Active },
  { name: 'administrador', key: 'admin', state: State.Active },
];
