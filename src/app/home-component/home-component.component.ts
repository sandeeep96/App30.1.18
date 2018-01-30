import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Winner} from '../winner';
import {WinnerService} from '../winners.service';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { Router }            from '@angular/router';


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  
  name = '';
  winners: Observable<Winner[]>;


  private searchTerms = new Subject<string>();

    constructor(private user: UserService,
      private winnerService: WinnerService,
      private router: Router) { }
  
      random:string='';

      search(term: string): void {
        console.log(term);
        this.searchTerms.next(term);
      }
    ngOnInit() {
      this.name = this.user.getUserLoggedIn();
      console.log('Is user logged in? ', this.user.getUserLoggedIn());

      this.winners = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.winnerService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Winner[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Winner[]>([]);
      });
  }

  gotoDetail(winner: Winner): void {
    let link = ['home/description', winner.id];
    this.random='';
    this.search('');
    this.router.navigate(link);
    
  }

  LogOut():void{
    this.user.logout();
    this.router.navigate(['/']);
  }

}
