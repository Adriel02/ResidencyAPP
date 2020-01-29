import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import {MatMenuModule} from '@angular/material/menu';
import {EnumResidency} from '../../enums/enum-residency.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : User;

  constructor(private _loggedUser: LoginService, private _userService: UserService, private _route: Router, private _auth: AuthService, private _taskService: TaskService) {
  }

  ngOnInit() {
  }

  logout() {
    this._loggedUser.logoutUser().subscribe(() => {
      this._auth.logout();
      this.removeAllLocalStorage();
      this._loggedUser.setUserLoggedOut();
      this._route.navigate(['/']);
    }, (error) => {
      console.log(error);
    });

  }

  removeAllLocalStorage() {
    localStorage.clear();
  }

  goProfile() {
    this._route.navigate(['/profile']);
  }

  home() {
    this._route.navigate(['/list_tasks']);
  }


  goDashboard() {
    this._route.navigate(['/dashboard']);
  }


}
