import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';

import {WinnerService} from '../winners.service';
import {Winner} from '../winner';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {

  winners: Winner[] = [];

  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;

  constructor(private winnerService: WinnerService,private router: Router) { }

  ngOnInit() {
    console.log("ng init");
    this.refreshData();

  }

  public ngOnDestroy(): void {
    console.log("ng destroy");
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private refreshData(): void {
    this.postsSubscription = this.winnerService.getWinners().subscribe(
      (data) => {
        this.winners = data;
        this.subscribeToData();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      },
      function () {
        console.log("completed");
      }
    );
  }

  private subscribeToData(): void {

    this.timerSubscription = Observable.timer(10000)
      .subscribe(() => this.refreshData());
  }

  gotoDetail(winner): void {
    this.router.navigate(['home/description', winner.id]);
  }
  
}
