import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {Task} from '../../model/task';
import {Router} from '@angular/router';
import {EnumResidency} from '../../enums/enum-residency.enum';


@Component({
  selector: 'app-list-task-component',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  datePickerConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  bsvalue;
  date;
  private users: User[];
  private states: string [] = ['All', EnumResidency.PENDING, EnumResidency.INPROGRESS, EnumResidency.FINALIZED];
  private stompClient = null;
  formGroup: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedBossColums = ['user.name', 'subTask.id', 'room.number', 'state', 'additionalInformation', 'incidence', 'Options'];
  displayedEmployeeColums = ['subTask.id', 'room.number', 'state', 'additionalInformation', 'incidence', 'Options'];

  constructor(
    private _formBuilder: FormBuilder,
    private _loggedUser: LoginService,
    private _user: UserService,
    private _taskService: TaskService,
    private _router: Router,
  ) {
    this.datePickerConfig = Object.assign({}, {
        showWeekNumbers: false,
        dateInputFormat: EnumResidency.DATEINPUTFORMAT,
        containerClass: 'theme-dark-blue',
        isDisabled: true,
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
        user: [],
        state: []
      }
    );
  }


  private setDefaultValue() {
    if (localStorage.getItem('date')) {
      this.bsvalue = new Date(localStorage.getItem('date'));
    } else {
      this.bsvalue = new Date();
    }

    if (localStorage.getItem('state')) {
      this.formGroup.controls.state.setValue(localStorage.getItem('state'));
    } else {
      this.formGroup.controls.state.setValue(EnumResidency.ALL);
      localStorage.setItem('state',EnumResidency.ALL);
    }
    if (localStorage.getItem('user')) {
      this.formGroup.controls.user.setValue(JSON.parse(atob(localStorage.getItem('user'))));
    } else {
      this.formGroup.controls.user.setValue(EnumResidency.ALL);
    }
  }

  private getAllData() {
    if (this._loggedUser.getRoleUser() == EnumResidency.JEFEDEPARTAMENTO) {
      this.getUserByRole();
      this._taskService.getAllTasks().subscribe((tasks) => {
        this.getData(tasks);
      }, (error) => {
        console.log(error);
      });
    } else if (this._loggedUser.getRoleUser() == EnumResidency.TRABAJADOR) {
      this._taskService.getAllTaskByUser(this._loggedUser.getUserId()).subscribe((tasks) => {
        this.getData(tasks);
      }, (error) => {
        console.log(error);
      });
    }
  }


  private getUserByRole() {
    this._user.getUsersByRole(EnumResidency.TRABAJADOR).subscribe((user) => {
        let trabajadorAll = new User();
        trabajadorAll.name = EnumResidency.ALL;
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
    this.dataSource.paginator= this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      let task = item;
      if (item.task != null) {
        task = item.task;

      }
      switch (property) {
        case 'user.name':
          return task.user.name;
        case 'subTask.id':
          return task.subTask.id;
        case 'room.number':
          return task.floorNumber + '' + task.room.number;
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
    return this._loggedUser.getRoleUser() == EnumResidency.JEFEDEPARTAMENTO;
  }


  applyFilterDate() {
    let date = this.bsvalue;
    this.dataSource.filterPredicate =
      (data: any, filter) => {
        if (data.task == null) {
          if (this.formGroup.controls.user.value != EnumResidency.ALL) {
            if (this.formGroup.controls.state.value != EnumResidency.ALL) {
              return data.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1
                && data.state.indexOf(localStorage.getItem('state')) == -1;
            } else {
              return data.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1
                && data.state.indexOf(localStorage.getItem('state')) != -1;
            }
          } else {
            if (this.formGroup.controls.state.value != EnumResidency.ALL) {
              return data.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1
                && data.state.indexOf(localStorage.getItem('state')) == -1;
            } else {
              return data.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1
                && data.state.indexOf(localStorage.getItem('state')) != -1;
            }
          }
        } else {
          if (this.formGroup.controls.user.value != EnumResidency.ALL) {
            if (this.formGroup.controls.state.value != EnumResidency.ALL) {
              return data.task.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1
                && data.task.state.indexOf(localStorage.getItem('state')) == -1;
            } else {
              return data.task.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1
                && data.task.state.indexOf(localStorage.getItem('state')) != -1;
            }

          } else {
            if (this.formGroup.controls.state.value != EnumResidency.ALL) {
              return data.task.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1
                && data.task.state.indexOf(localStorage.getItem('state')) == -1;
            } else {
              return data.task.creationDate.toString().substring(0, 10).indexOf(filter) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1
                && data.task.state.indexOf(localStorage.getItem('state')) != -1;
            }

          }
        }
      };
    this.dataSource.filter = date.toISOString().substring(0, 10).trim();
  }

  applyFilterUser() {
    let searchUser = this.formGroup.controls.user.value;
    let stateValue = localStorage.getItem('state');
    if (searchUser != EnumResidency.ALL) {
      this.dataSource.filterPredicate =
        (data: any, filter) => {
          if (data.task == null) {
            if (stateValue != EnumResidency.ALL) {
              return data.user.name.indexOf(filter) != -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.state.indexOf(stateValue) != -1;
            } else {
              return data.user.name.indexOf(filter) != -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.state.indexOf(stateValue) == -1;
            }
          } else {
            if (stateValue != EnumResidency.ALL) {
              return data.task.user.name.indexOf(filter) != -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.state.indexOf(stateValue) != -1;
            } else {
              return data.task.user.name.indexOf(filter) != -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.state.indexOf(stateValue) == -1;
            }
          }
        };
      this.dataSource.filter = searchUser.trim();
    } else {
      this.dataSource.filterPredicate =
        (data: any, filter) => {
          if (data.task == null) {
            if (stateValue != EnumResidency.ALL) {
              return data.user.name.indexOf(filter) == -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.state.indexOf(stateValue) != -1;
            } else {
              return data.user.name.indexOf(filter) == -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.state.indexOf(stateValue) == -1;
            }

          } else {
            if (stateValue != EnumResidency.ALL) {
              return data.task.user.name.indexOf(filter) == -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.state.indexOf(stateValue) != -1;
            } else {
              return data.task.user.name.indexOf(filter) == -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.state.indexOf(stateValue) == -1;
            }
          }
        };
      this.dataSource.filter = searchUser.trim();
    }
  }


  applyFilterState() {
    let stateValue = localStorage.getItem('state');
    if (stateValue != EnumResidency.ALL) {
      this.dataSource.filterPredicate =
        (data: any, filter) => {
          if (data.task == null) {
            if (this.formGroup.controls.user.value != EnumResidency.ALL) {
              return data.state.indexOf(filter) != -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1;
            } else {
              return data.state.indexOf(filter) != -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1;
            }
          } else {
            if (this.formGroup.controls.user.value != EnumResidency.ALL) {
              return data.task.state.indexOf(filter) != -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1;
            } else {
              return data.task.state.indexOf(filter) != -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1;
            }
          }
        };
      this.dataSource.filter = stateValue.trim();
    } else {
      this.dataSource.filterPredicate =
        (data: any, filter) => {
          if (data.task == null) {
            if (this.formGroup.controls.user.value != EnumResidency.ALL) {
              return data.state.indexOf(filter) == -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1;
            } else {
              return data.state.indexOf(filter) == -1
                && data.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1;
            }
          } else {
            if (this.formGroup.controls.user.value != EnumResidency.ALL) {
              return data.task.state.indexOf(filter) == -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) != -1;
            } else {
              return data.task.state.indexOf(filter) == -1
                && data.task.creationDate.toString().substring(0, 10).indexOf(this.bsvalue.toISOString().substring(0, 10)) != -1
                && data.task.user.name.toString().indexOf(this.formGroup.controls.user.value) == -1;
            }
          }
        };
      this.dataSource.filter = stateValue.trim();
    }
  }

  deleteTask(task: Task) {
    if (confirm('¿Estás seguro que quieres eliminar la tarea?')) {
      this._taskService.deleteTask(task.id).subscribe(() => {
      }, (error) => {
        console.log(error);
      });
    }
  }

  createTask() {
    let task = new Task();
    this.saveTaskInLocalStorage(task);
    this._taskService.setter(task);
    this._router.navigate(['/task']);
  }


  saveTaskInLocalStorage(task) {
    localStorage.setItem('task', btoa(JSON.stringify(task)));
    localStorage.setItem('date', this.bsvalue);
    localStorage.setItem('user', btoa(JSON.stringify(this.formGroup.controls.user.value)));
  }

  connectWebSocket() {
    const socket = new SockJS(EnumResidency.IP + '/ws-task');
    this.stompClient = Stomp.Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function () {


      _this.stompClient.subscribe('/ws/add', function (task) {
        _this.addTaskHtml(JSON.parse(task.body));
      });
      _this.stompClient.subscribe('/ws/update', function (task) {
        _this.updateTaskHtml(JSON.parse(task.body));
      });
      _this.stompClient.subscribe('/ws/remove', function (task) {
        _this.removeTaskHtml(task.body);

      });
    });
  }

  addTaskHtml(task: Task) {
    if (this.isBoss() || this._loggedUser.getUserId() == task.user.id) {
      this.dataSource.data.push(task);
      this.dataSource._updateChangeSubscription();
    }
  }

  updateTaskHtml(task: Task) {
    let index = this.dataSource.data.findIndex((obj => obj.id == task.id));
    if (index >= 0) {
      if (!this.isBoss() && this._loggedUser.getUserId() != task.user.id) {
        this.dataSource.data.splice(this.dataSource.data.indexOf(this.dataSource.data[index]), 1);
      } else {
        this.dataSource.data[index] = task;
      }
    } else {
      this.dataSource.data.push(task);
    }
    this.dataSource._updateChangeSubscription();
  }

  removeTaskHtml(id: string) {
    let index = this.dataSource.data.findIndex((obj => obj.id == id));
    if (index != null) {
      this.dataSource.data.splice(this.dataSource.data.indexOf(this.dataSource.data[index]), 1);
      index = this.dataSource.data.findIndex((obj => {
        if (obj.task != null) {
          return obj.task.id == id;
        }
      }));
      this.dataSource._updateChangeSubscription();
    }
  }

  updateTask(task: Task) {
    this._taskService.setter(task);
    this.saveTaskInLocalStorage(task);
    this._router.navigate(['/task']);
  }

  employeeUpdateTask(task: Task) {
    this._taskService.setter(task);
    this.saveTaskInLocalStorage(task);
    this._router.navigate(['/update']);
  }

  stateChange(event: any) {
    localStorage.setItem('state', event.target.value.substring(3, event.target.value.length));
    this.applyFilterState();
  }

}

