import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {Task} from 'src/app/model/Task';
import {EnumResidency} from '../../enums/enum-residency.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  private pendingTask;
  private inProgressTask;
  private finalizedTask;
  private users;
  formGroup: FormGroup;

  private barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };


  private colors = ['#ebdef0', '#d4e6f1', '#d1f2eb', '#d4efdf', '#fcf3cf', '#f6ddcc', '#f6ddcc', '#e5e8e8'];
  private barChartLabels = [];
  private barChartType = 'bar';
  private barChartLegend = true;
  private barChartData;
  private barChartColors = [
    {
      backgroundColor: this.colors[6]
    }
  ];
  private barChartLabelsByUser = [];
  private barChartTypeByUser = 'bar';
  private barChartLegendByUser = true;
  private barChartDataByUser;
  private barChartColorsByUser = [
    {
      backgroundColor: this.colors[4]
    }
  ];

  private pieChartLabels = [];
  private pieChartType = 'pie';
  private pieChartLegend = true;
  private pieChartData = [];
  private pieChartColors = [
    {
      backgroundColor: this.colors
    }
  ];

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
    this.generateFormGroup();
    this.crerateTasksInformation();
    this.generateDiagrams();
  }

  private async crerateTasksInformation() {
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

  private generateDiagrams() {
    this._userService.getUsersByRole(EnumResidency.TRABAJADOR).subscribe((users) => {
      this.users = users;
      this.generateBarDiagram();
      this.getTaskByUsername();
    }, (error) => {
      console.log(error);
    });
  }


  private getTaskByUsername() {
    console.log(this.users);
    for (let i in this.users) {
      this._taskService.getTaskNotFinalizedByUserID(this.users[i].id).subscribe((tasks) => {
        this.pieChartLabels.push(this.users[i].name);
        console.log(this.users[i].name + '-' + tasks.length);
        this.pieChartData.push(tasks.length);
      }, (error) => {
        console.log(error);
      });
    }
  }

  applyFilterUser() {
    this._taskService.getAllTaskByUser(this.formGroup.controls.user.value).subscribe( (tasks) =>{
      for(let i in tasks){
        if((tasks[i].state) === EnumResidency.FINALIZED){
          this.barChartLabelsByUser.push('Task '+ i);
          this.barChartDataByUser.push(20+i);
        }
      }
    }, (error) => {
      console.log(error);
    });

  }


  private generateBarDiagram() {
    for (let i in this.users) {
      this.barChartLabels.push(this.users[i].name);
    }

    this.barChartData = [
      {data: [33, 25, 30, 40, 22, 18], label: 'Average Time to Finish Task (Hours)'}
    ];

    this.chartReady = true;
  }


  private generateFormGroup() {
    this.formGroup = this._formBuilder.group({
        user: []
      }
    );
  }
}
