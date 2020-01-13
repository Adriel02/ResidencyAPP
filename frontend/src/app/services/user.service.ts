import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {EnumResidency} from '../enums/enum-residency.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = EnumResidency.IP + '/user';
  private user: User;

  constructor(private _http: HttpClient) {
  }

  getUserByUsername(username: string) {
    return this._http.get<User>(this.base_url + '/username/' + username);
  }

  getUsersByRole(role: string) {
    return this._http.get<User[]>(this.base_url + '/role/' + role);
  }

  getUsersByRoleAndTimeSheet(role: string, timeSheet: string) {
    return this._http.get<User[]>(this.base_url + '/' + role + '/' + timeSheet);
  }


  updateUser(user: User) {
    return this._http.put(this.base_url + '/',user);
  }

  getter() {
    return this.user;
  }

  setter(user: User) {
    this.user = user;
  }
}
