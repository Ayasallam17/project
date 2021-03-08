import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MyguardGuard implements CanActivate {
  constructor(private _auth:UserService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this._auth.isLoggedTest()) {
        alert('you should log first')
        this.router.navigate(['login'])
      return false
      }
    return true;
  }
  
}
