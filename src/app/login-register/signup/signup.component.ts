import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormGroupDirective,NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { UserForm } from 'src/app/models/user_form.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService,Country,State } from 'src/app/services/data.service';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
class EmailValidityMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

class PasswordMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
   return control.dirty && form.invalid;
  }

}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  constructor(private authService : AuthService, private dataService:DataService, private router : Router) { }
 
  countryList: { countryCode: string;
  countryName :string }[]=[];

  stateList:{stateCode:string;
  stateName :string}[]=[];
  hide = true;
  ngOnInit(): void {

    this.signUpForm =  new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'middleName':new FormControl(null),
      'lastName':new FormControl(null,[Validators.required]),
      'mobileNumber':new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      'email':new FormControl(null,[Validators.email,Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'confirmPassword':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'country': new FormControl(null,Validators.required),
      'state': new FormControl(null,Validators.required),
      'gender':new FormControl(null),
      'addressFirstPart':new FormControl(null,Validators.required),
      'addressSecondPart':new FormControl(null,Validators.required),
      'zipCode':new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(6)])
    },{
      validators:this.passwordValidator
    });

    let countryObs : Observable<Country>;
    countryObs = this.dataService.getCountryList();
    countryObs.subscribe(resData => {
        for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          var obj ={
            countryCode :key,
            countryName : resData[key]
          }
         this.countryList.push(obj);
        }
      }
    });
  }

  passwordValidator(form:FormGroup){
    const condition = form.get('password').value !== form.get('confirmPassword').value;

    return condition ? {passwordDoNotMatch :true}:null;
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

    populateState(){
      console.log("Country Selected ",this.signUpForm.value.country);
       this.stateList = [];
      let stateObs : Observable<State>;
      stateObs = this.dataService.getStateList(this.signUpForm.value.country);

      stateObs.subscribe(respData =>{
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            var obj ={
              stateCode :key,
              stateName : respData[key]
            };
            this.stateList.push(obj);
          }
        }
        console.log("State ",this.stateList);
      });
    }
  }
