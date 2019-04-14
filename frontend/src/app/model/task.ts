import {SubTask} from './sub-task';
import {User} from './user';

export class Task {
  id: string;
  creationDate: Date;
  editDate: Date;
  endDate: Date;
  subTask: SubTask;
  user: User;
  incidence: string;
  additionalInformation: string;
  state: string;

  constructor() {
    this.state = 'Pending';
  }
}
