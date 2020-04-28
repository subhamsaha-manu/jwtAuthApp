import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit {
  title = 'jwtAuth';
  isLoggedIn = false;
  username: string;

  constructor(private authService:AuthService){}

  ngOnInit(){
   /* this.isLoggedIn = !!this.tokenService.getToken();
    console.log("App component isLoggedIn ",this.isLoggedIn);
    if(this.isLoggedIn){
      const user = this.tokenService.getUser();

      this.username = user;
    }*/

    this.authService.autoLogin();
  }

 
}
