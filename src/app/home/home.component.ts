import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  isLoggedIn = false;
  constructor(private authService : AuthService,private userService: UserService) { }
  
  ngOnInit() {
  /*  this.isLoggedIn = !!this.tokenService.getToken();
    console.log("Home component isLoggedIn ",this.isLoggedIn);
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
*/
  
}
logout() {
  this.authService.logout();
 }

 test(){
   console.log("Test() in component")
  this.userService.getPublicContent().subscribe(data=>{
    console.log("Public content ",data);
  },err=>{
    console.log("Public content error ",err);
  });
 }
}