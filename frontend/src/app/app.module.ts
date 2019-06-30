import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './components/list-task/list-task.component';
import {ResidencyService} from './services/residency.service';
import {TaskService} from './services/task.service';
import {SubTaskService} from './services/sub-task.service';
import {LoginService} from './services/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'list_tasks', component: ListTaskComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListTaskComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [ResidencyService, TaskService, SubTaskService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
