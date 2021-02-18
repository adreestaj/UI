import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'employer-manageJob',
  templateUrl: './manageJob.component.html',
  styleUrls: ['./manageJob.component.scss']
})
export class ManageJobComponent implements OnInit {
  constructor(private router: Router, ) {
  }
  ngOnInit() {

  }

  onCreateClick(){
    this.router.navigate(['/employer/createJob']);

  }

}
