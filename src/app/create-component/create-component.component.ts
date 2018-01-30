import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { Router }            from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {Validators} from '@angular/forms';

import {Winner} from '../winner';
import {WinnerWOid} from '../winnerWOid';
import {WinnerService} from '../winners.service';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.css']
})
export class CreateComponentComponent implements OnInit {

  constructor(private winnerService: WinnerService, private location: Location,private router: Router) { }

  forms;
  value: Date;

  public winnerWOid: WinnerWOid= { 
    name: '', 
    event:'', 
    medal:'', 
    venue:'', 
    image:'',
    image1:'',
    description:'',
    year:null 
  } ;

  ngOnInit() {
    this.forms= new FormGroup({
      Name:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      Event:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      Date:new FormControl("",Validators.required) ,
      Medal:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      Venue:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      Year:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      Image1:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      Image2:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) ,
      About:new FormControl("",Validators.compose([Validators.minLength(5),Validators.required])) 
        });
  }

  goBack(): void {
   // this.location.back();
    this.router.navigate(['/home' ]);
  }
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.create(name)
  //     .then(hero => {
  //       this.heroes.push(hero);
  //       this.selectedHero = null;
  //     });
  // }

  createDetail(formm): void {
    this.winnerWOid.name=formm.Name;
    this.winnerWOid.event=formm.Event;
    this.winnerWOid.medal=formm.Medal;
    this.winnerWOid.venue=formm.Venue;
    this.winnerWOid.year=formm.Year;
    this.winnerWOid.image1=formm.Image2;
    this.winnerWOid.image=formm.Image1;
    this.winnerWOid.description=formm.About;

    if (!this.winnerWOid) { return; }
    this.winnerService.create(this.winnerWOid)
      .then(hero => {
        console.log(hero.id+" with name "+hero.name+" is added");
        this.goBack();
      });
  }
}
