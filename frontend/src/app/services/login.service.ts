import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLogin;
  private user: User;

  constructor(private _http: HttpClient) {
    this.isUserLogin = false;
  }


  loginUser(name: string, password: string) {
    let params = new HttpParams();
    params = params.append('user', name);
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(name + ':' + password)});
    return this._http.get<User>(EnumResidency.IP + '/login',
      {
        headers: headers,
        params: params
      });

  }


  logoutUser() {
    return this._http.get(EnumResidency.IP + '/logout');
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
    return this.user.name + ' ' + this.user.surname;
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
import {EnumResidency} from '../enums/enum-residency.enum';
