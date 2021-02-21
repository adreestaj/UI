import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import { HttpService } from '../../Services/http-service.service';
import {LoginService} from '../../Services/login.service';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {ActivatedRoute, Router} from '@angular/router';

import {Job} from '../../Models/Job';

@Component({
  selector: 'employer-createJob',
  templateUrl: './createJob.component.html',
  styleUrls: ['./createJob.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  returnUrl: string;
  submitted = false;
  job: Job = new Job();
  public editorOptions: Object = { apiKey : 'qmdjakwrD-13sapD1uxu==' };
  constructor(private  loginService: LoginService,
    private httpClint: HttpClient,
    private http: HttpService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.loginService.checkIfLoggedIn();
  }

  logout(){
    this.loginService.logout();
  }
  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      minSalary: ["", [Validators.required]],
      hideSalary: [""],
      maxSalary: ["", [Validators.required]],
      totalHires: ["", [Validators.required]],
      resumesPerHire: ["", [Validators.required]],
      jobSummary: ["", ],
      candidateRequirements: [""],
    });


  }

  get f() {
    return this.createJobForm.controls;
  }


  onSubmit() {
    if (this.createJobForm.invalid) {
      this.submitted = true;
      return;
    }
    /*   this.user.username = this.f.username.value;
       this.user.password = this.f.password.value;
   */
    this.http.PostDefault('/job', this.job)
      .subscribe((res: HttpResponse<any>)=> {
        if (res.status==200) {
          this.createJobForm.reset();
        } else {
          this.http.alertError("Something went wrong...");
          // this.btnText = 'Sign in';
        }

      }, err => {
        console.log(err);
        if (err!=undefined && err.error!=null){
          this.http.alertError(err.error.message);
        }
      });
  }
}
