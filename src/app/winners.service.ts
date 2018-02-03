import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Winner} from './winner';
import {WinnerWOid} from './winnerWOid';

@Injectable()
export class WinnerService {

    constructor(private http: Http) { }

    private winnersUrl = 'http://localhost:3000/winners';  // URL to web api

    // private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});

    // private options = new RequestOptions({ headers: this.headers });


     // getHeroes(): Promise<Hero[]> {
      //   return Promise.resolve(HEROES);
      // }
    private headers = new Headers({'Content-Type': 'application/json'});

    getWinners(): Observable<Winner[]> {
        return this.http.get(this.winnersUrl)
                   .map(response => response.json() as Winner[])
                   .catch(this.handleError);
      }
       
      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }

    // getHero(id: number): Promise<Hero> {
    //     return this.getHeroes()
    //                .then(heroes => heroes.find(hero => hero.id === id));
    //   }
    // getHero(id: number): Promise<Hero> {
    //    const url = `${this.heroesUrl}/${id}`;
    //   // return this.http.get(url)
    //  // const url = 'api/heroes/'+'id';
    //   return this.http.get(url)
    //     .toPromise()
    //     .then(response => response.json().data as Hero)
    //     .catch(this.handleError);
    // }
    getWinner(id: number): Promise<Winner> {
      const url = `${this.winnersUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => { 
          //console.log(response);
          //console.log(response.json());
          //console.log(response.json().data);
          return response.json() as Winner})
        .catch(this.handleError);
    }
    
    
    // update(hero: Hero): Promise<Hero> {
    //   const url = `${this.heroesUrl}/${hero.id}`;
    //   return this.http
    //     .put(url, JSON.stringify(hero), {headers: this.headers})
    //     .toPromise()
    //     .then(() => hero)
    //     .catch(this.handleError);
    // }

    update(winner1: Winner): Promise<Winner> {
      const url = `${this.winnersUrl}/${winner1.id}`;
      return this.http
        .put(url, JSON.stringify(winner1), {headers: this.headers})
        .toPromise()
        .then(() => winner1)
        .catch(this.handleError);
    }
    
    // create(name: string): Promise<Hero> {
    //   return this.http
    //     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    //     .toPromise()
    //     .then(res => res.json().data as Hero)
    //     .catch(this.handleError);
    // }

    create(winnerWOid: WinnerWOid): Promise<Winner> {
      return this.http
        .post(this.winnersUrl, JSON.stringify(winnerWOid), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Winner)
        .catch(this.handleError);
    }

    
    delete(id: number): Promise<void> {
      const url = `${this.winnersUrl}/${id}`;
      return this.http.delete(url).toPromise()
        .catch(this.handleError);
    }
   
    search(term: string): Observable<Winner[]> {
      return this.http
                 .get(`http://localhost:3000/winners/?name=${term}`)
                 .map(response => response.json() as Winner[]);
    }
}