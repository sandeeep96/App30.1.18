import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service'
import {Router} from '@angular/router';

@Injectable()
export class AuthguardGuard implements CanActivate, CanActivateChild{

  constructor(private user: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {   
      //this.router.navigate(['/']);
      //console.log('You are not authenticated');
      // if(this.user.getUserLoggedIn())
      if(localStorage.getItem('currentUser'))
      {
        return true;
      }
      else
      {
        this.router.navigate(['login']);
        return false;
      }
  }

  canActivateChild(): boolean {
    if(localStorage.getItem('currentUser'))
    {
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      return false;
    }
  }
}

// export class AuthguardGuard implements CanActivate, CanActivateChild ,CanDeactivate<ComponentName>, CanLoad{
  
//     constructor(private user: UserService, private router: Router) {}
  
//     canActivate(
//       next: ActivatedRouteSnapshot,
//       state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
//       {   
//         //this.router.navigate(['/']);
//         //console.log('You are not authenticated');
//         if(this.user.getUserLoggedIn())
//         {
//           return true;
//         }
//         else
//         {
//           this.router.navigate(['login']);
//         }
//     }
    
//     CanActivateChild(): boolean{
//       return confirm('do you really want to go inside it ');
//     }
  
//     CanDeactivate(templeate: ComponentName): boolean{
//      if (nextState.url='/home')
//       return confirm('do you really want to get out of it or simply navigating ');
//     }

//     CanLoad(): boolean{
//       return confirm('do you really want load that module through lazy loading ');
//     }

//   }
  