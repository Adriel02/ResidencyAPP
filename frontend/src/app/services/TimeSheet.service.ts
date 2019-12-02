import {Injectable} from '@angular/core';
import {EnumResidency} from '../enums/enum-residency.enum';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
  private base_url = EnumResidency.IP+'/timeSheet';


  constructor(private _http: HttpClient) {
  }

  getAll(){
    return this._http.get(this.base_url);
  }

  getByID(id:string){
    return this._http.get(this.base_url+'/'+id);
  }
}
