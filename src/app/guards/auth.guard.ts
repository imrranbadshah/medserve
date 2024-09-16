import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HelpersService } from '../services/helpers/helpers.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private authService: HelpersService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getUserDetails()         // {1}
      .pipe(
        take(1), // {2} 
        map((isLoggedIn: any) => {   // {3}
          if (Object.keys(isLoggedIn).length == 0) {
            this.router.navigate(['/candidate-login']);  // {4}
            return false;
          }
          return true;
        })
      );
  }

}
