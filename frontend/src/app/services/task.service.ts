import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../model/task';
import {EnumResidency} from '../enums/enum-residency.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private base_url: string = EnumResidency.IP+'/task';
  private _task: Task;

  get task(): Task {
    return this._task;
  }

  set task(value: Task) {
    this._task = value;
  }

  constructor(private _http: HttpClient) {
  }

  getAllTasks() {
    return this._http.get<Task[]>(this.base_url);
  }

  getAllTaskByUser(userId: string){
    return this._http.get<Task[]>(this.base_url + '/' + userId);
  }

  deleteTask(id: string) {
    return this._http.delete(this.base_url + '/' + id);
  }

  createTask(task: Task) {
    return this._http.post(this.base_url + '/', task);
  }

  updateTask(task: Task) {
    var params = new FormData();
    params.append('task', JSON.stringify(task));
    return this._http.put(this.base_url + '/', params);
  }


  setter(task:Task){
    this.task= task;
  }
  getter(){
    return this.task;
  }
}
