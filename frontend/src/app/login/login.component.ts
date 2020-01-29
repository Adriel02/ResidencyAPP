import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;
  submitted = false;
  error = null;
  user: User;
  userNow: User;

  constructor(private _loggedUser: LoginService, private _userService: UserService, private _route: Router, private _auth: AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._route.navigate(['/list_tasks']);
    } else {
      this.loginForm = new FormGroup(
        {
          'username': new FormControl(this.username, Validators.required),
          'password': new FormControl(this.password, Validators.required),
        }
      );
      this._loggedUser.setUserLoggedOut();
    }
  }

  get controls() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.error = null;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._loggedUser.loginUser(this.controls.username.value, this.controls.password.value).subscribe((user) => {
      this._loggedUser.setUserLoggedIn();
      this._loggedUser.setUser(user);
      this._auth.sendToken(btoa(JSON.stringify(user)));
      this.userLogged();
      this._route.navigate(['/list_tasks']);
    }, (error) => {
      this.error = error.error;
      if (this.error != null) {
        this.error = {'message': 'User Not Found'};
      }
    });


  }

  private userLogged() {
    this._userService.getUserByUsername(this._loggedUser.getUser().username).subscribe((user) => {
      this.userNow = new User();
      this.userNow = user;
      localStorage.setItem('userLogged',btoa(JSON.stringify(this.userNow)));
    }, (error) => {
      console.log(error);
    });


  }

}
