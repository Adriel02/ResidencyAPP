import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {BsDatepickerConfig} from 'ngx-bootstrap';


@Component({
  selector: 'app-list-task-component',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  datePickerConfig: Partial<BsDatepickerConfig>;
  bsvalue;
  date;
  private users: User[];
  private stompClient = null;
  formGroup: FormGroup;

  dataSource: MatTableDataSource<any>;
  displayedUserColums = ['user.name', 'room', 'state', 'additionalInformation', 'incidence', 'Options'];

  constructor(
    private _formBuilder: FormBuilder,
    private _loggedUser: LoginService,
    private _user: UserService,
    private _taskService: TaskService,
  ) {
    this.datePickerConfig = Object.assign({}, {
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-dark-blue',
        isDisabled: true
      }
    );
  };


  ngOnInit() {
    this.generateFormGroup();
    this.setDefaultValue();
    this.getAllData();
    this.connectWebSocket();
  }

  private generateFormGroup() {
    this.formGroup = this._formBuilder.group(
      {
        user: []
      }
    );
  }


  private setDefaultValue() {
    if (localStorage.getItem('date')) {
      this.bsvalue = new Date(localStorage.getItem('date'));
    } else {
      this.bsvalue = new Date();
    }

    if (localStorage.getItem('user')) {
      this.formGroup.controls.value.setValue(JSON.parse(atob(localStorage.getItem('user'))));
    } else {
      this.formGroup.controls.user.setValue('All');
    }
  }

  private getAllData() {
    if (this._loggedUser.getRoleUser() == 'jefedepartamento') {
      this.getUserByRole();
      this._taskService.getAllTasks().subscribe((tasks) => {
        this.getData(tasks);
      }, (error) => {
        console.log(error);
      });
    }
  }


  private getUserByRole() {
    this._user.getUserByRole('trabajador').subscribe((user) => {
        let trabajadorAll = new User();
        trabajadorAll.name = 'All';
        this.users = user;
        this.users.splice(0, 0, trabajadorAll);
      }, (error) => {
        console.log(error);
      }
    );
  }


  private getData(tasks) {
    const rows = [];
    tasks.forEach(task => rows.push(task));
    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.sortingDataAccessor = (item, property) => {
      let task = item;
      if (item.task != null) {
        task = item.task;

      }
      switch (property) {
        case 'user.name':
          return task.user.name;
        case 'room':
          return task.room;
        case 'state':
          return task.state;
        case 'additionalInformation':
          return task.additionalInformation;
        case 'incidence':
          return task.incidence;
        default:
          return task[property];
      }
    };
    this.applyFilterUser();
    this.dataSource.sort = this.sort;

  }

  isBoss() {
    return this._loggedUser.getRoleUser() == 'jefedepartamento';
  }


  applyFilterDate() {
    let date = this.bsvalue;
    this.dataSource.filterPredicate =
      (data: any, filter) => {
        if (data.task == null) {
          if (this.formGroup.controls.user.value != 'All') {
            return data.creationDate.toString().substring(0, 10).indexOf(filter) != -1
              && data.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1;
          } else {
            return data.creationDate.toString().substring(0, 10).indexOf(filter) != -1
              && data.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1;
          }
        } else {
          if (this.formGroup.controls.user.value != 'All') {
            return data.task.creationDate.toString().substring(0, 10).indexOf(filter) != -1
              && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1;
          } else {
            return data.task.creationDate.toString().substring(0, 10).indexOf(filter) != -1
              && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1;
          }
        }
      };
    this.dataSource.filter = date.toISOString().substring(0, 10).trim();
  }

  applyFilterUser() {
    let searchUser = this.formGroup.controls.user.value;
    if (searchUser != 'All') {
      this.dataSource.filterPredicate =
        (data: any, filter) => {
          if (data.task == null) {
            return data.user.name.indexOf(filter) != -1
              && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1;
          } else {
            return data.task.user.name.indexOf(filter) != -1
              && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1;
          }
        };
      this.dataSource.filter = searchUser.trim();
    } else {
      this.dataSource.filterPredicate =
        (data: any, filter) => {
          if (data.task == null) {
            return data.user.name.indexOf(filter) == -1
              && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1;
          } else {
            return data.task.user.name.indexOf(filter) == -1
              && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1;
          }
        };
      this.dataSource.filter = searchUser.trim();
    }
  }

  connectWebSocket() {
    const socket = new SockJS('http://192.168.1.94:8080/ws-task');
    this.stompClient = Stomp.Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function () {

    });
  }

}
