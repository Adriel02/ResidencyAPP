import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = 'http://192.168.1.94:8080/user';


  constructor(private _http: HttpClient) {
  }

  getUserByUsername(username: string) {
    return this._http.get(this.base_url + '/username/' + username);
  }

  getUserByRole(role: string) {
    return this._http.get<User>(this.base_url + '/role/' + role);
  }

  createUser(user: User) {
    return this._http.post(this.base_url + '/', user);
  }
}
