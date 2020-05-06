import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
const API_URL = 'http://localhost:8080/api/utilities/';

export interface Country{
  countryCode:string;
  countryName : string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {


  

  constructor(private http: HttpClient) { }

  
  getCountryList() {
    console.log("getCountry() in service")
    return this.http.get(API_URL + 'countries')
 }

 getStateList(selectedCountry:string) {
  console.log("getCountry() in service")
  let params = new HttpParams();
  params = params.append('selecetedCountry',selectedCountry);
  return this.http.get(API_URL + 'states',{params:params});
  
}
 
}
