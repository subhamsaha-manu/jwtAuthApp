import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
const API_URL = 'http://localhost:8080/api/utilities/';

export interface Country{
  countryCode:string;
  countryName : string;
}

export interface State{
  stateCode:string;
  stateName : string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  
  getCountryList():Observable<Country> {
    console.log("getCountry() in service")
    return this.http.get<Country>(API_URL + 'countries')
 }

 getStateList(selectedCountry:string):Observable<State> {
  console.log("getCountry() in service")
  let params = new HttpParams();
  params = params.append('selectedCountry',selectedCountry);
  return this.http.get<State>(API_URL + 'states',{params:params});
  
  }
}
