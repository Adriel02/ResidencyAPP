import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){ }
  sendToken(token: string){
    localStorage.setItem("token",token);
  }
  getToken(){
    return localStorage.getItem("token");
  }
  isLoggingIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("token");
  }
}
