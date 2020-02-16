import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {LoginService} from '../services/login.service';
import {EnumResidency} from '../enums/enum-residency.enum';

@Injectable({
  providedIn: 'root'
})
export class OnlyBossGuard implements CanActivate {
  constructor(private _loggedUser: LoginService, private _router: Router, private _auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._auth.isLoggingIn() && this._loggedUser.getRoleUser() == EnumResidency.JEFEDEPARTAMENTO) {
      if (!this._loggedUser.getUserLoggedIn()) {
        this.setUserAgain();
      }
      console.log(this._loggedUser.getRoleUser());
      if(this._loggedUser.getRoleUser() == EnumResidency.JEFEDEPARTAMENTO){
        return true;
      } else{
        this._router.navigate(['/list_tasks']);
        return false;
      }
    } else {
      this._router.navigate(['/list_tasks']);
      return false;
    }
  }


  setUserAgain() {
    this._loggedUser.setUserLoggedIn();
    let user = JSON.parse(atob(this._auth.getToken()));
    this._loggedUser.setUser(user);
  }
}
