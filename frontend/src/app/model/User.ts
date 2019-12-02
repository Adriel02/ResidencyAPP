import {Role} from './Role';
import {TimeSheet} from './TimeSheet';

export class User {
  id: string;
  name: string;
  surname: string;
  dni: string;
  role: Role;
  username: string;
  password: string;
  timeSheet: TimeSheet;

}
