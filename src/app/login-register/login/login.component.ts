import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService,AuthResponseData } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserForm } from 'src/app/models/user_form.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {

    this.loginForm =  new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
    console.log("Login component ");
    this.authService.user.subscribe(data =>{console.log("Login components ",data)});
    
  }

  onSubmit(){

    let authObs : Observable<AuthResponseData>;

    const userForm = new UserForm(
      this.loginForm.value.email,
      this.loginForm.value.password);
      authObs = this.authService.login(userForm);
      authObs.subscribe(resData =>{
        console.log("Login success ",resData);
        this.router.navigate(['/home']);
      })
    this.loginForm.reset();
  }
}

