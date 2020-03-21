import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any={};
  isLoggedIn = false;
  isLoggedInFailed = false;
  errorMessage = '';
  

  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
    }
  }

  onSubmit(){
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoggedIn = true;
        this.isLoggedInFailed = false;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoggedInFailed = true;
      }
    );
  }

  reloadPage(){
    window.location.reload();
  }
}
