import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


const routes: Routes = [
{
  path : 'register',component : RegisterComponent,
  children :[
    {path : 'login',component : LoginComponent},
    {path : 'signup',component: SignupComponent, pathMatch: 'full' },
    
  ]
 },
 { path: '**',component :PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule { }
