import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomServiceService {

  constructor(private http: Http) { }

  public getCountriesNames(){
    let _url :string ='https://restcountries.eu/rest/v2/all';
    return this.http.get(_url);
  } 

  public getCountryDetail(countryName:string){
    let _url :string ='https://restcountries.eu/rest/v2/name/'+countryName+'?fullText=true';
    return this.http.get(_url);
    
  }
}
