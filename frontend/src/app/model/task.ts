import {SubTask} from './subTask';
import {User} from './user';
import {Room} from './room';

export class Task {
  id: string;
  creationDate: Date;
  editDate: Date;
  endDate: Date;
  subTask: SubTask;
  room: Room;
  floorNumber: number;
  user: User;
  incidence: string;
  additionalInformation: string;
  state: string;

  constructor() {
    this.state = 'Pending';
  }
}
