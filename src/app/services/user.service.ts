import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(){
    console.log("Test in service")
    return this.http.get(API_URL + 'all',{responseType: 'text'});
 }
}
