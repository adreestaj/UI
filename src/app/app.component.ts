import {Component, OnInit} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoginService } from './Services/login.service';
import { User } from './Models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit{
  IsLoginPage:boolean;
  currentUser: User;
  currentUserSubscription: Subscription;
  isLoadLeftNav:boolean=false;
    constructor( private router: Router, private loginService: LoginService) {

      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        this.IsLoginPage=(this.currentUser != null);
      });

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
     }


  title = 'FlexBoard';

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
}

  ngOnInit(): void {
  }

}
