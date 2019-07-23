import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';


@Component({
  selector: 'app-list-task-component',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {


  @ViewChild(MatSort, {static: false}) sort: MatSort;
  bsvalue;
  date;
  private users: User[];

  formGroup: FormGroup;

  displayedUserColums = ['user.name'];

  dataSource: MatTableDataSource<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _loggedUser: LoginService,
    private _user: UserService,
    private _taskService: TaskService,
  ) {
  };


  ngOnInit() {
    //this.generateFormGroup();
    //this.setDefaultValue();
    this.getAllData();
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
    console.log('hola');
    if (this._loggedUser.getRoleUser() == 'jefedepartamento') {
      this.getUserByRole();
      this._taskService.getAllTasks().subscribe((tasks) => {
        this.getData(tasks);
      });
    }

  }


  private getUserByRole() {
    console.log('asdasda');
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
    tasks.forEach(task => rows.push(task, {detailRow: true, task}));
    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.sortingDataAccessor = (item, property) => {
      let task = item;
      if (item.task != null) {
        task = item.task;

      }
      switch (property) {
        case 'user.name':
          return task.user.name;
      }
    };
    //this.applyFilterUser();
    this.dataSource.sort = this.sort;

  }

}
