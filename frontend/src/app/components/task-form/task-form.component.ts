import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/Task';
import {ResidencyService} from '../../services/residency.service';
import {User} from '../../model/User';
import {SubTask} from '../../model/SubTask';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubTaskService} from '../../services/subTask.service';
import {Floor} from '../../model/Floor';
import {Room} from '../../model/Room';
import {EnumResidency} from '../../enums/enum-residency.enum';
import {Role} from '../../model/Role';
import {LoginService} from '../../services/login.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private task: Task;
  private users: User[];
  taskForm: FormGroup;
  submitted = false;
  private subTasks: SubTask [];
  private rooms: Room [];
  private floors: Floor[];
  private timeSheet: string;
  private states: string [] = ['Pending', 'In progress', 'Finalized'];
  pendingUser: User;
  pendingRole: Role;


  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _userService: UserService,
    private _residencyService: ResidencyService,
    private _subTaskService: SubTaskService,
    private _loggedUser: LoginService
  ) {
  }

  ngOnInit() {
    if (this._taskService.getter() == null) {
      let task = new Task();
      if (localStorage.getItem('Task.ts')) {
        task = JSON.parse(atob(localStorage.getItem('Task.ts')));
      }
      this._taskService.setter(task);
    }
    this.task = this._taskService.getter();
    this.getResidency(EnumResidency.RESIDENCIAABUELITO);
    this.getUsersByRole();
    this.getAllSubtasks();
    if (this.task.id != undefined) {
      this.generateFormGroup();
    } else {
      this.generateEmptyFormGroup();
    }
  }


  getAllSubtasks() {
    this._subTaskService.getAllSubtasks().subscribe((subTask) => {
      this.subTasks = subTask;
      if (this.task.id != undefined) {
        let subtask: SubTask = this.subTasks.find((obj => obj.id == this.task.subTask.id));
        this.taskForm.controls.subTask.setValue(subtask, {onlySelf: true});
      }
    }, (error) => {
      console.log(error);
    });
  }

  private getResidency(id: string) {
    this._residencyService.getResidency(id).subscribe((residency) => {
      this.floors = residency.floors;
      this.setDefaultValues();
    }, (error) => {
      console.log(error);
    });
  }

  private getUsersByRole() {
    //this.getTimeSheet(new Date().getHours() + ':' + new Date().getMinutes());
    this._userService.getUsersByRoleAndTimeSheet(EnumResidency.TRABAJADOR,this.timeSheet).subscribe((user) => {
      this.users = user;
      this.setDefaultValuesUser();
    }, (error) => {
      console.log(error);
    });
  }

  private generateFormGroup() {
    this.taskForm = new FormGroup({
      'user': new FormControl(''),
      'roomNumber': new FormControl('', Validators.required),
      'state': new FormControl(this.task.state, Validators.required),
      'subTask': new FormControl(this.task.subTask, Validators.required),
      'floorNumber': new FormControl('', Validators.required),
      'additionalInformation': new FormControl(this.task.additionalInformation),
    });
  }

  processForm() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.formToTask();
    if (this.task.id == undefined) {
      this.task.creationDate = new Date();
      console.log(this._loggedUser.getUser());
      this.task.supervisor = this._loggedUser.getUser();
      this._taskService.createTask(this.task).subscribe(() => {
        this.successMessage('create');
        this._router.navigate(['/list_tasks']);
      }, (error) => {
        console.log(error);
      });
    } else {
      this._taskService.updateTask(this.task).subscribe((task) => {
        this.successMessage('update');
        this._router.navigate(['/list_tasks']);
      }, (error) => {
        console.log(error);
      });
    }
  }

  private generateEmptyFormGroup() {
    this.taskForm = new FormGroup({
      'user': new FormControl(''),
      'roomNumber': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'subTask': new FormControl('', Validators.required),
      'floorNumber': new FormControl('', Validators.required),
      'additionalInformation': new FormControl('')
    });
  }

  get controls() {
    return this.taskForm.controls;
  }

  private setDefaultValues() {
    if (this.task.id != undefined) {
      let index = this.floors.findIndex((floor => floor.numberFloor == this.task.floorNumber));

      if (index != null) {
        this.taskForm.controls.floorNumber.setValue(this.floors[index], {onlySelf: true});
        this.taskForm.controls.floorNumber.disable();

        this.rooms = this.floors[index].rooms;

        let room = this.rooms.find(room => room.number == this.task.room.number);
        this.taskForm.controls.roomNumber.setValue(room, {onlySelf: true});
        this.taskForm.controls.roomNumber.disable();
      }
    }
  }

  private setDefaultValuesUser() {
    if (this.task.id != undefined) {
      let index = this.users.findIndex((obj => obj.id == this.task.user.id));
      if (index >= 0) {
        this.taskForm.controls.user.setValue(this.users[index], {onlySelf: true});
      }
    }
  }

  private successMessage(message: string) {
    if (message == 'create') {
      alert('La tarea ha sido creada satisfactoriamente');
    } else {
      alert('La tarea ha sido modificada satisfactoriamente');

    }
  }

  private formToTask() {
    this.task.additionalInformation = this.taskForm.controls.additionalInformation.value;
    this.task.floorNumber = this.taskForm.controls.floorNumber.value.numberFloor;
    this.task.room = this.taskForm.controls.roomNumber.value;
    console.log('Usuario ------------->' + this.taskForm.controls.user.value);
    if (this.taskForm.controls.user.value != null) {
      this.task.user = this.taskForm.controls.user.value;
    }
    this.task.state = this.taskForm.controls.state.value;
  }


  addSubTask() {
    this.task.subTask = this.taskForm.controls.subTask.value;
  }

  changeRooms() {
    this.rooms = this.taskForm.controls.floorNumber.value.rooms;
  }

}
