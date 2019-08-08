import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/task';
import {ResidencyService} from '../../services/residency.service';
import {User} from '../../model/user';
import {log} from 'util';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TemplateAccessibilityValidAriaRule} from 'codelyzer';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private task: Task;
  private users: User[];
  taskForm: FormGroup;

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _userService: UserService,
    private _residencyService : ResidencyService,
    )


    {}

  ngOnInit() {
    if(this._taskService.getter() == null){
      let task = new Task();
      if (localStorage.getItem('task')) {
        task = JSON.parse(atob(localStorage.getItem('task')));
      }
      this._taskService.setter(task);
    }
    this.task = this._taskService.getter();
    this.getResidency('');
    this.getUsersByRole();
    if(this.task.id!= undefined){
      this.generateFormGroup();
    }else{
      this.generateEmptyFormGroup();
    }
  }


  private getResidency(id: string) {
    this._residencyService.getResidency(id).subscribe( (residency) => {
      this.setDefaultValues();
    }, (error) => {
      console.log(error);
    })
  }

  private getUsersByRole() {
    this._userService.getUsersByRole('trabajador').subscribe( (user) => {
      this.users = user;
      this.setDefaultValuesUser();
    }, (error) => {
      console.log(error);
    });
  }

  private generateFormGroup() {

  }

  private generateEmptyFormGroup() {
    this.taskForm= new FormGroup({
      'user' : new FormControl('',Validators.required),
      'roomNumber' : new FormControl('',Validators.required),
      'subTask' : new FormControl('',Validators.required),
      'additionalInformation' : new FormControl(''),
    })
  }

  private setDefaultValues() {

  }

  private setDefaultValuesUser() {

  }
}
