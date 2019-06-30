import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Residency} from '../model/residency';

@Injectable({
  providedIn: 'root'
})
export class ResidencyService {

  private base_url = 'localhost:8080/residency';

  constructor(private _http: HttpClient) {
  }

  getResidency(id: string) {
    return this._http.get<Residency>(this.base_url + '/' + id);
  }

  getAllResidency() {
    return this._http.get<Residency[]>(this.base_url);
  }
}
