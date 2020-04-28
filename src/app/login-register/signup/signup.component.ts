import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { UserForm } from 'src/app/models/user_form.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {

    this.signUpForm =  new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'middleName':new FormControl(null),
      'lastName':new FormControl(null,[Validators.required]),
      'mobileNumber':new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      'email':new FormControl(null,[Validators.email,Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

  }

  onSubmit(){
    const userForm = new UserForm(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.firstName,
        this.signUpForm.value.middleName,
        this.signUpForm.value.lastName,
        +this.signUpForm.value.mobileNumber
        )

        let authObs : Observable<AuthResponseData>;
        authObs = this.authService.register(userForm);

        authObs.subscribe(resData =>{
          console.log("Login success ",resData);
          this.router.navigate(['/home']);
        })
      this.signUpForm.reset();
    }
  }
