import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {Task} from 'src/app/model/Task';
import {EnumResidency} from '../../enums/enum-residency.enum';
import {User} from '../../model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  private tasks: Task[];
  pendingTask;
  inProgressTask;
  finalizedTask;
  users: User [];

  constructor(
    private _formBuilder: FormBuilder,
    private _loggedUser: LoginService,
    private _userService: UserService,
    private _taskService: TaskService,
    private _router: Router,
  ) {
  }

  ngOnInit() {

    this.giveMeData();
  }

  private giveMeData() {

    this._taskService.getNumberOfTaskByState(EnumResidency.PENDING).subscribe( (num) => {
      console.log(num);
      this.pendingTask = num;
    }, (error) => {
      console.log(error)
    });
    this._taskService.getNumberOfTaskByState(EnumResidency.INPROGRESS).subscribe( (num) => {
      console.log(num);
      this.inProgressTask = num;
    }, (error) => {
      console.log(error)
    });
    this._taskService.getNumberOfTaskByState(EnumResidency.FINALIZED).subscribe( (num) => {
      console.log(num);
      this.finalizedTask = num;
    }, (error) => {
      console.log(error)
    });

    this.getUserByRole();

  }

  private getUserByRole() {
    this._userService.getUsersByRole(EnumResidency.TRABAJADOR).subscribe((user) => {
        let trabajadorAll = new User();
        trabajadorAll.name = EnumResidency.ALL;
        this.users = user;
        this.users.splice(0, 0, trabajadorAll);
      }, (error) => {
        console.log(error);
      }
    );
  }

  applyFilterUser() {

  }
}
