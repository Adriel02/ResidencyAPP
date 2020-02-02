import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ResidencyService} from '../../services/residency.service';
import {SubTaskService} from '../../services/subTask.service';
import {Task} from '../../model/Task';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EnumResidency} from '../../enums/enum-residency.enum';

@Component({
  selector: 'app-employee-task-form',
  templateUrl: './employee-task-form.component.html',
  styleUrls: ['./employee-task-form.component.css']
})
export class EmployeeTaskFormComponent implements OnInit {


  taskForm: FormGroup;
  private task: Task;
  listSubTasks: string [];

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _userService: UserService,
    private _residencyService: ResidencyService,
    private _subTaskService: SubTaskService,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    if (this._taskService.getter() == null) {
      let task = new Task();
      if (localStorage.getItem('Task.ts')) {
        task = JSON.parse(atob(localStorage.getItem('Task.ts')));
      } else {
        this._router.navigate(['/list_tasks']);
      }
      this._taskService.setter(task);
    }
    this.task = this._taskService.getter();
    this.generateFormGroup();

  }

  private generateFormGroup() {
    this.listSubTasks = this.task.subTask.tasksToDo;
    const listTasks = this.task.isFinished.map(isTaskFinished => {
      if (isTaskFinished == true) {
        const formControl = new FormControl(true);
        formControl.disable();
        return formControl;
      }
      return new FormControl(false);
    });

    this.taskForm = this._formBuilder.group({
      incidence: [this.task.incidence],
      state: [this.task.state],
      floor: [this.task.floorNumber],
      room: [this.task.room.number],
      task: [this.task.subTask.type + ' (' + this.task.subTask.id + ')'],
      taskToDo: new FormArray(listTasks),
      additionalInformation: [this.task.additionalInformation],
    });

  }

  processForm() {
    if (this.taskForm.controls.incidence != null) {
      this.task.incidence = this.taskForm.controls.incidence.value;
    }
    console.log(this.isAllTaskFinish());
    if (this.isAllTaskFinish()) {
      this.task.state = EnumResidency.FINALIZED;
      this.task.endDate = new Date();
    } else if (!this.isAllTaskFinish()) {
      this.task.state = EnumResidency.INPROGRESS;
    } else {
      this.task.state = EnumResidency.PENDING;
    }
    this.task.editDate = new Date();
    this.task.room.lastCleaningDate = new Date();
    this._taskService.updateTask(this.task).subscribe((task) => {
      this.successMessage('update');
      this._router.navigate(['/list_tasks']);
    }, (error) => {
      console.log(error);
    });
  }

  addSubtask(i: number) {
    this.task.isFinished[i] = !this.task.isFinished[i];
  }

  private isAllTaskFinish() {
    for (let isFinish of this.task.isFinished) {
      if (!isFinish) {
        return false;
      }
    }
    return true;
  }

  private successMessage(message: string) {

  }
}


