import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Router }            from '@angular/router';
import {Winner} from '../winner';
import {WinnerService} from '../winners.service';

@Component({
  selector: 'app-description-component',
  templateUrl: './description-component.component.html',
  styleUrls: ['./description-component.component.css']
})
export class DescriptionComponentComponent implements OnInit {

 public winner: Winner;
 public loggedIn: boolean=false;

 

  constructor(private winnerService: WinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

    ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.winnerService.getWinner(+params.get('id')))
        .subscribe(hero => this.winner = hero);
    }

  goBack(): void {
    let link = ['home',];
    this.router.navigate(link);
  }

  deleteDetail(): void {
    this.winnerService
        .delete(this.winner.id)
        .then((req) => {
          // this.heroes = this.heroes.filter(h => h !== hero);
          // if (this.selectedHero === hero) { this.selectedHero = null; }
          console.log(req);
          this.location.back();
        });
  }

  saveDetail(): void {
     this.winnerService.update(this.winner)
    .then(() => this.goBack());
  }

  exitEditDetail(){
    this.loggedIn=false;
  }

  editDetail(){
    this.loggedIn=true;
  }
}
