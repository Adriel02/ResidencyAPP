import {SubTask} from './subTask';
import {User} from './user';

export class Task {
  id: string;
  creationDate: Date;
  editDate: Date;
  endDate: Date;
  subTask: SubTask;
  room: String;
  user: User;
  incidence: string;
  additionalInformation: string;
  state: string;

  constructor() {
    this.state = 'Pending';
  }
}
