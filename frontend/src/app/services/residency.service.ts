import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Residency} from '../model/residency';
import {EnumResidency} from '../enums/enum-residency.enum';

@Injectable({
  providedIn: 'root'
})
export class ResidencyService {

  private base_url = EnumResidency.IP+'/residency';

  constructor(private _http: HttpClient) {
  }

  getResidency(id: string) {
    return this._http.get<Residency>(this.base_url + '/' + id);
  }

  getAllResidency() {
    return this._http.get<Residency[]>(this.base_url);
  }
}
