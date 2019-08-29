import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {EnumResidency} from '../enums/enum-residency.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = EnumResidency.IP+'/user';


  constructor(private _http: HttpClient) {
  }

  getUserByUsername(username: string) {
    return this._http.get(this.base_url + '/username/' + username);
  }

  getUsersByRole(role: string) {
    return this._http.get<User[]>(this.base_url + '/role/' + role);

  }

  createUser(user: User) {
    return this._http.post(this.base_url + '/', user);
  }
}
