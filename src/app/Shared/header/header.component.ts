import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/Services/http-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private http: HttpService) { }

  ngOnInit() {
  }

  onPatientSelection(evnt:any) {

    this.router.navigate(['/medical/visitDetails/'+evnt.item.PatientId]);


  }


  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
