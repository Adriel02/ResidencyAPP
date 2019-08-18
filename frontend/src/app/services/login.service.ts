import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private base_url: string = 'http://192.168.1.94:8080';
  private isUserLogin;
  private user: User;

  constructor(private _http: HttpClient) {
    this.isUserLogin = false;
  }


  loginUser(name: string, password: string) {
    let params = new HttpParams();
    params = params.append('user', name);
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(name + ':' + password)});
    return this._http.get<User>(this.base_url + '/login',
      {
        headers: headers,
        params: params
      });

  }


  logoutUser() {
    return this._http.get(this.base_url + '/logout');
  }

  setUserLoggedIn() {
    this.isUserLogin = true;
  }

  getUserLoggedIn() {

    return this.isUserLogin;
  }

  getUser() {
    return this.user;
  }

  getUserFName() {
    return this.user.name + ' ' + this.user.surnames;
  }

  getUserId() {
    return this.user.id;
  }

  getRoleUser() {
    return this.user.role.id;
  }


  setUser(user) {
    this.user = user;
  }

  setUserLoggedOut() {
    this.isUserLogin = false;
    this.user = null;
  }

}

import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
