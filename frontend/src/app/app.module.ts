import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './components/list-task/list-task.component';
import {ResidencyService} from './services/residency.service';
import {TaskService} from './services/task.service';
import {SubTaskService} from './services/subTask.service';
import {LoginService} from './services/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './Authentication/AuthGuard';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatSortModule, MatTableModule} from '@angular/material';
import {Observable} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { EmployeeTaskFormComponent } from './components/employee-task-form/employee-task-form.component';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xhr = req.clone({
      withCredentials: true,
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }

}


const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'task', component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update', component: EmployeeTaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list_tasks', component: ListTaskComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListTaskComponent,
    NavbarComponent,
    TaskFormComponent,
    EmployeeTaskFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    ResidencyService, TaskService, SubTaskService,LoginService,AuthGuard,{
    provide : HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
