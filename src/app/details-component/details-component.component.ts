import { Component, OnInit } from '@angular/core';
import { CountryServiceService } from '../country.service';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {

  
  public countriesList: any="";
  public countryName: string="";
  public countryObj: any="";   

  constructor(private countriesService: CountryServiceService) { }

  ngOnInit() {
    this.countriesService.getCountriesNames().subscribe(res=>this.countriesList=res.json());
   
  }

  public getCountryInfo(){
    this.countriesService.getCountryDetail(this.countryName).subscribe(res=> this.countryObj=res.json()[0]);
   
  }
  
}
 //console.log("1"+this.countriesList);
 // console.log("2"+this.countryObj);