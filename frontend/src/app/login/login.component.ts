import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

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

  constructor(private _loggedUser: LoginService, private _route: Router, private _auth: AuthService) {
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
      this._route.navigate(['/list_tasks']);
    }, (error) => {
      this.error = error.error;
      if (this.error != null) {
        this.error = {'message': 'User Not Found'};
      }
    });

  }

}
