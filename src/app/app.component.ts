import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers:[]
})
export class AppComponent implements OnInit {
  title = 'jwtAuth';
  isLoggedIN = false;
  username: string;

  constructor(private tokenService: TokenStorageService){}

  ngOnInit(){
    this.isLoggedIN = !!this.tokenService.getToken();

    if(this.isLoggedIN){
      const user = this.tokenService.getUser();

      this.username = user;
    }
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }
}
