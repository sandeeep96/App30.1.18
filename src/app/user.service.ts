import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
// import { Headers, Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public username;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(name) {
    // this.isUserLoggedIn = true;
    // this.username = name;
    if (!localStorage.getItem('currentUser')) {
      //localStorage.setItem('currentUser', JSON.stringify({ UserName:name }));
      localStorage.setItem('currentUser', name);
    }
  }

  getUserLoggedIn() {
    // return this.isUserLoggedIn;
    return localStorage.getItem('currentUser');
  }



  getUserDetails(term: string) {
    return this.http
      .get<User>("http://localhost:3000/users/?name=" + term)
      //  .map(response => response.json() as User).toPromise()
      //.then((res)=>console.log(res));
      .catch(this.handleError);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    //this.token = null;
    localStorage.removeItem('currentUser');
  }

  private handleError(error: any): Observable<any> {
    return Observable.throw(error.json().error || 'Server error');
  }
}