import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import {WinnerService} from '../winners.service';
import {Winner} from '../winner';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {

  winners: Winner[] = [];

  constructor(private winnerService: WinnerService,private router: Router) { }

  ngOnInit() {
    this.winnerService.getWinners()
    .subscribe(heroes => this.winners = heroes);
  }

  gotoDetail(winner): void {
    this.router.navigate(['home/description', winner.id]);
  }
  
}
