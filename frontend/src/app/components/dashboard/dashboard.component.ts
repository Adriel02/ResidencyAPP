import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {Task} from 'src/app/model/Task';
import {EnumResidency} from '../../enums/enum-residency.enum';
import {User} from '../../model/User';
import {logger} from 'codelyzer/util/logger';

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
  users = {};

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = [];

  public barChartType = 'bar';

  public barChartLegend = true;

  public barChartData;
  chartReady: boolean;


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
    this.getUserByRole();
  }

  private async giveMeData() {
    this._taskService.getNumberOfTaskByState(EnumResidency.PENDING).subscribe((num) => {
      this.pendingTask = num;
    }, (error) => {
      console.log(error);
    });
    this._taskService.getNumberOfTaskByState(EnumResidency.INPROGRESS).subscribe((num) => {
      this.inProgressTask = num;
    }, (error) => {
      console.log(error);
    });
    this._taskService.getNumberOfTaskByState(EnumResidency.FINALIZED).subscribe((num) => {
      this.finalizedTask = num;
    }, (error) => {
      console.log(error);
    });


  }

  private getUserByRole() {
    this._userService.getUsersByRole(EnumResidency.TRABAJADOR).subscribe((users) => {
      this.users = users;
      this.getAllUsers();
    }, (error) => {
      console.log(error);
    });
  }

  applyFilterUser() {

  }


  private getAllUsers() {
    for (let i in this.users) {
      this.barChartLabels.push(this.users[i].name);
    }

    this.barChartData = [
      {data: [33, 25, 30, 40, 22, 18], label: 'Average Time to Finish Task (Hours)'}
    ];

    this.chartReady = true;
  }

  private getAverage(user: User) {
    let tasks;

    tasks = this._taskService.getAllTaskByUser(user.id).toPromise();
    console.log(tasks);
  }
}
