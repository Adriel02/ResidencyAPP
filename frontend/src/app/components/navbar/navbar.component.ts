import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _loggedUser: LoginService,private _route: Router, private _auth: AuthService, private _taskService : TaskService) { }

  ngOnInit() {
  }

  logout(){
    this._loggedUser.logoutUser().subscribe(() => {
      this._auth.logout();
      this.removeAllLocalStorage();
      this._loggedUser.setUserLoggedOut();
      this._route.navigate(['/']);
    }, (error) => {
      console.log(error);
    });

  }
  removeAllLocalStorage(){
    localStorage.clear();
  }

}
