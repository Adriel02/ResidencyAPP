import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubTask} from '../model/SubTask';
import {EnumResidency} from '../enums/enum-residency.enum';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  private base_url = EnumResidency.IP+'/subtask';

  constructor(private _http: HttpClient) {
  }

  getAllSubtasks() {
    return this._http.get<SubTask[]>(this.base_url);
  }
}
