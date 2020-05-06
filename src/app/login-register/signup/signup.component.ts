import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { UserForm } from 'src/app/models/user_form.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService,Country } from 'src/app/services/data.service';
import { tap } from 'rxjs/internal/operators/tap';

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
  ngOnInit(): void {

    this.signUpForm =  new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'middleName':new FormControl(null),
      'lastName':new FormControl(null,[Validators.required]),
      'mobileNumber':new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      'email':new FormControl(null,[Validators.email,Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'country': new FormControl("IND",Validators.required),
      'state': new FormControl(null,Validators.required),
    });

    let countryObs : Observable<any>;
    countryObs = this.dataService.getCountryList();
    countryObs.subscribe(resData => {
        for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          var obj ={
            countryCode :key,
            countryName : resData[key]
          }
          console.log(typeof this.countryList);
         this.countryList.push(obj);
        }
      }
    })
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

    populateState(event){
      console.log("Country ",event.target.value);
      console.log("Country ",this.signUpForm.value.country);
      this.dataService.getStateList(this.signUpForm.value.country).subscribe();
    }
  }
