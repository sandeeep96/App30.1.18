import { Component, OnInit } from '@angular/core';

import { CustomServiceService } from '../custom-service.service';

@Component({
  selector: 'app-custom-comp1',
  templateUrl: './custom-comp1.component.html',
  styleUrls: ['./custom-comp1.component.css']
})
export class CustomComp1Component implements OnInit {

  public countriesList: any="";
  public countryName: string="";
  public countryObj: any=""; 

  constructor(private countriesService: CustomServiceService) { }

  ngOnInit() {
    this.countriesService.getCountriesNames().subscribe(res=>this.countriesList=res.json());
    //console.log("1"+this.countriesList);
  }

  public getCountryInfo(){
    this.countriesService.getCountryDetail(this.countryName).subscribe(res=> this.countryObj=res.json()[0]);
   // console.log("2"+this.countryObj);
  }
  
}
