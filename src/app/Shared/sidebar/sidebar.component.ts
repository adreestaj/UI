import { Component, OnInit } from '@angular/core';
import { MENU_ITEM } from '../../Models/MENU_ITEM';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menues = MENU_ITEM;

  loadAPI: Promise<any>;

  constructor(private router: Router,) {
    this.loadAPI = new Promise((resolve) => {
      resolve(true);
    });


  }
  checkLoadLeftNav(){
    return this.router.url=="/employer/createJob" || this.router.url=="/employer/manageJob" ;
  }

  ngOnInit() {

  }


}
