import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _loggedUser: LoginService,
    private _userService: UserService,
    private _taskService: TaskService,
    private _router: Router,
  ) { }

  ngOnInit() {

  }

}
