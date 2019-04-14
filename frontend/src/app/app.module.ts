import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './components/list-task/list-task.component';
import {ResidencyService} from './services/residency.service';
import {TaskService} from './services/task.service';
import {SubTaskService} from './services/sub-task.service';


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
    ListTaskComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ResidencyService, TaskService, SubTaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
