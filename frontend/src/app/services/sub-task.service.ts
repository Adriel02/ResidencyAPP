import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubTask} from '../model/sub-task';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  private base_url = 'http://192.168.1.94:8080/subtask';

  constructor(private _http: HttpClient) {
  }

  getAllSubtasks() {
    return this._http.get<SubTask[]>(this.base_url);
  }
}
