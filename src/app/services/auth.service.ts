import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { UserForm } from '../models/user_form.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  id:string;
  email : string;
  jwtToken : string;
  expirationTime :string;
  
}

const AUTH_API = 'http://localhost:8080/api/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer : any;
  constructor(private http: HttpClient, private router : Router) { }

  login(userForm : UserForm){
    console.log("Auth Service Login "+" "+userForm.email+" "+userForm.password);
    return this.http
    .post<AuthResponseData>(
      AUTH_API + 'signin',
      {
        email : userForm.email,
        password : userForm.password
      }
    )
    .pipe(tap(respData => {

      this.handleAuthentication(
        respData.id,
        respData.email,
        respData.jwtToken,
        +respData.expirationTime
        );
    }));
  }

  register(userForm : UserForm){
     
    //console.log("Auth Service ",user.value);
     return this.http.post<AuthResponseData>(AUTH_API + 'signup' , 
     {
      firstName : userForm.firstName,
      middleName : userForm.middleName,
      lastName : userForm.lastName,
      mobileNumber : userForm.mobileNumber,
      email : userForm.email,
      password : userForm.password
    }).pipe(tap(respData => {

      this.handleAuthentication(
        respData.id,
        respData.email,
        respData.jwtToken,
        +respData.expirationTime
        );
    }));
  }

 handleAuthentication(
   id:string,
   email:string,
   token:string,
   expirationTime:number
   ){

    const expiresIn = new Date(new Date().getTime() + expirationTime);
    const user = new User(
      id,
      email,
      token, 
      expiresIn
      );
      this.user.next(user);
      this.autoLogout(expirationTime);
      localStorage.setItem('userData',JSON.stringify(user));
  }

  autoLogin(){
    const userData:{
    id:string;
    email:string;
    _token:string;
    _tokenExpirationDate:string; 
    }= JSON.parse(localStorage.getItem('userData'));

    
    if(!userData){
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
      );

      if(loadedUser.token){
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.user.next(loadedUser);
        this.autoLogout(expirationDuration);
      }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/register/login']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }
}
