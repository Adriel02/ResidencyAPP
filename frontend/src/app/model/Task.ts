import {SubTask} from './SubTask';
import {User} from './User';
import {Room} from './Room';
import {Audit} from './Audit';

export class Task {
  id: string;
  creationDate: Date;
  editDate: Date;
  endDate: Date;
  subTask: SubTask;
  room: Room;
  floorNumber: number;
  user: User;
  supervisor : User;
  isFinished: boolean [];
  incidence: string;
  additionalInformation: string;
  state: string;
  audits: Audit [];

}
