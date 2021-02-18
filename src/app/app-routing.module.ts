import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Shared/login/login.component';
import {RegisterComponent} from './Shared/registration/register.component';
import {CreateJobComponent} from './employer/createJob/createJob.component';
import {ManageJobComponent} from './employer/manageJob/manageJob.component';



const routes: Routes = [

 {
    path: 'employer/createJob',
    component:CreateJobComponent,
   data:{title: 'createJob'}
  },
{
    path: 'employer/manageJob',
    component:ManageJobComponent,
   data:{title: 'manageJob'}
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',

  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },{
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: '**', component: LoginComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
