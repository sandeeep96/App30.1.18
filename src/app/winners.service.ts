import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Winner } from './winner';
import { WinnerWOid } from './winnerWOid';

@Injectable()
export class WinnerService {

  constructor(private http: HttpClient) { }

  private winnersUrl = 'http://localhost:3000/winners';  // URL to web api

  // private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});

  // private options = new RequestOptions({ headers: this.headers });


  // getHeroes(): Promise<Hero[]> {
  //   return Promise.resolve(HEROES);
  // }

  // private headers = new Headers({'Content-Type': 'application/json'});

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getWinners() {
    return this.http.get<Winner[]>(this.winnersUrl)
      .do(response => {
        console.log("got all");
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }

  private handleError(error: any): Observable<any> {
    return Observable.throw(error.json().error || 'Server error');
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
  getWinner(id: number) {
    const url = `${this.winnersUrl}/${id}`;
    return this.http.get<Winner>(url)
      .do(response => {
        console.log("got 1");
        console.log(response);
        return response;
      })
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

  update(winner1: Winner) {
    const url = `${this.winnersUrl}/${winner1.id}`;
    return this.http
      .put<Winner>(url, JSON.stringify(winner1), this._options)
      .do(response => {
        console.log("updated 1");
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }

  // create(name: string): Promise<Hero> {
  //   return this.http
  //     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data as Hero)
  //     .catch(this.handleError);
  // }

  create(winnerWOid: WinnerWOid) {
    return this.http
      .post<Winner>(this.winnersUrl, JSON.stringify(winnerWOid), this._options)
      .do(response => {
        console.log("created 1");
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }


  delete(id: number) {
    const url = `${this.winnersUrl}/${id}`;
    return this.http.delete(url)
      .do(response => {
        console.log("deleted 1");
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }

  search(term: string) {
    return this.http
      .get<Winner[]>(`http://localhost:3000/winners/?name=${term}`)
      //  .map(response => response.json() as Winner[]);
      .do(response => {
        console.log("search 1");
        console.log(response);
        return response;
      })
      .catch(this.handleError);
  }
}