import { Injectable } from '@angular/core';


import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';
@Injectable()
export class Authguard implements CanActivate{

  constructor(private router:Router, private authenticationService: LoginService) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        return true;
    }
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
