import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/task';
import {ResidencyService} from '../../services/residency.service';
import {User} from '../../model/user';
import {SubTask} from '../../model/subTask';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubTaskService} from '../../services/subTask.service';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';


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
  private rooms : Room [];
  private floors: Floor[];

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _userService: UserService,
    private _residencyService: ResidencyService,
    private _subTaskService: SubTaskService,
  ) {
  }

  ngOnInit() {
    if (this._taskService.getter() == null) {
      let task = new Task();
      if (localStorage.getItem('task')) {
        task = JSON.parse(atob(localStorage.getItem('task')));
      }
      this._taskService.setter(task);
    }
    this.task = this._taskService.getter();
    this.getResidency('Abuelito');
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
    }, (err) => {
      console.log(err);
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
    this._userService.getUsersByRole('trabajador').subscribe((user) => {
      this.users = user;
      this.setDefaultValuesUser();
    }, (error) => {
      console.log(error);
    });
  }

  private generateFormGroup() {
    this.taskForm = new FormGroup({
      'user': new FormControl('', Validators.required),
      'roomNumber': new FormControl('', Validators.required),
      'floorNumber': new FormControl('', Validators.required),
      'subTask': new FormControl(this.task.subTask, Validators.required),
      'additionalInformation': new FormControl(this.task.additionalInformation),
    });
  }

  processForm() {
    console.log(this.taskForm);
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.formToTask();
    if (this.task.id == undefined) {
      this.task.creationDate = new Date();
      this._taskService.createTask(this.task).subscribe(() => {
        this.successMessage();
        this._router.navigate(['/list_tasks']);
      }, (error) => {
        console.log(error);
      });
    } else {
      this._taskService.updateTask(this.task).subscribe((task) => {
        this.successMessage();
        this._router.navigate(['/list_tasks']);
      }, (error) => {
        console.log(error);
      });
    }
  }

  private generateEmptyFormGroup() {
    this.taskForm = new FormGroup({
      'user': new FormControl('', Validators.required),
      'roomNumber': new FormControl('', Validators.required),
      'floorNumber': new FormControl('', Validators.required),
      'subTask': new FormControl('', Validators.required),
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

  private successMessage() {
    console.log('La tarea ha sido creada satisfactoriamente');
  }

  private formToTask() {
    console.log('entro1');
    this.task.additionalInformation = this.taskForm.controls.additionalInformation.value;
    this.task.floorNumber = this.taskForm.controls.floorNumber.value.numberFloor;
    this.task.room = this.taskForm.controls.roomNumber.value;
    this.task.user = this.taskForm.controls.user.value;
  }

  addSubTask() {

  }

  changeRooms() {
    this.rooms = this.taskForm.controls.floorNumber.value.rooms;
  }
}
