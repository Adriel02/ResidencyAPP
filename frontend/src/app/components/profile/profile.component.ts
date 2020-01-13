import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {User} from '../../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  userForm: FormGroup;
  private submitted: boolean = false;
  user: User;

  constructor(
    private _formBuilder: FormBuilder,
    private _loggedUser: LoginService,
    private _userService: UserService,
    private _taskService: TaskService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    if (this._userService.getter() == null) {
      let user = new User();
      if (localStorage.getItem('user')) {
        user = JSON.parse(atob(localStorage.getItem('user')));
      }
      this._userService.setter(user);
    }
    this.user = this._userService.getter();
    console.log(this.user);
    this.generateFormGroup();
  }


  private generateFormGroup() {
    this.userForm = new FormGroup({
      'name': new FormControl(this.user.name),
      'surname': new FormControl(this.user.surname),
      'dni': new FormControl(this.user.dni),
      'timeSheet': new FormControl(this.user.timeSheet),
      'username': new FormControl(this.user.username),
      'password': new FormControl(this.user.password),
      'confirmPassword': new FormControl(this.user.password),
    });
  }


  processForm() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    if (this.user.id != undefined && this.formToUser()){
      this._userService.updateUser(this.user).subscribe((user) => {
        this._router.navigate(['/list_tasks']);
      }, (error) => {
        console.log(error);
      });
    }
  }


  private formToUser() {
    if (this.userForm.controls.password.value != null &&
      this.userForm.controls.confirmPassword.value != null &&
      this.userForm.controls.password.value == this.userForm.controls.confirmPassword.value) {

      this.user.password = this.userForm.controls.password.value;
      return true;
    }else{
      alert("Las contraseñas no coinciden. Intentelo de nuevo");
      return false;
    }
  }


}
