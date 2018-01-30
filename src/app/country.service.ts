import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryServiceService {

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