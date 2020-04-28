import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SignupComponent
  ],
  imports: [
    RouterModule,
    CommonModule,// added to get accesss to ngFor and ngIf
    LoginRegisterRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginRegisterModule { }
