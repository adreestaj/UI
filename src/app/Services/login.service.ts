import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalService } from './global.service';
import {Router} from '@angular/router';
import {HttpService} from './http-service.service';




@Injectable({providedIn: 'root'})
export class LoginService{

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  User:User=new User();

  constructor(private globalService: GlobalService, private router: Router,private http:HttpService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public checkIfLoggedIn(){
      if (sessionStorage.getItem("Authorization")==null || sessionStorage.getItem("Authorization")==undefined){
        this.http.alertError("Please login");
        this.logout();
      }
  }
  login( token: string) {


  //    sessionStorage.setItem('currentUser', JSON.stringify(this.User));
      sessionStorage.setItem('Authorization', token);
      // this.currentUserSubject.next(this.User);

  }


  logout() {
    sessionStorage.removeItem('Authorization');
    this.router.navigate(['login']);
  }

}
