import {Component, OnInit, ElementRef, ViewChild, ViewChildren} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from '../../Models/Job';
import {LoginService} from '../../Services/login.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {HttpService} from '../../Services/http-service.service';
import {Candidate} from '../../Models/CandidateModel';
import {Observable} from 'rxjs';
@Component({
  selector: 'employer-manageJob',
  templateUrl: './manageJob.component.html',
  styleUrls: ['./manageJob.component.scss']
})
export class ManageJobComponent implements OnInit {
  scheduleDate: any;
  scheduleTime: any;
  scheduleForm: FormGroup;
  returnUrl: string;
  submitted = false;
  job: Job = new Job();
  jobs: any;
  scheduleReq: Candidate = new Candidate();
  hideModel: boolean=false;
  @ViewChild('closebutton', {static: false}) closebutton;
  private candidates: any;
  private currentCandidate: any;
  private url: any;
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
    this.onLoad();
    this.scheduleForm = this.formBuilder.group({
      scheduleTime: ["", [Validators.required]],
      scheduleDate: ["", [Validators.required]],

    });


  }

  get f() {
    return this.scheduleForm.controls;
  }


  onLoad() {

    this.http.Get('/job')
      .subscribe((res)=> {
        if (res.status==200) {
          this.jobs = res.data;
          if (this.jobs.length<1){
            this.http.alertError("No Job Posted");
            return;
          }
          this.closebutton.nativeElement.click();

          this.candidates = this.jobs[0].candidates;
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
  onClickDownload(fileName) {

    this.http.Get('/singedUrl/'+fileName)
      .subscribe((res)=> {
        if (res.status==200) {
          this.url = res.data;
          if (this.url){
            window.open(this.url, "_blank");
          }


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
  downloadFile(url) {

    this.http.GetFile(url)
      .subscribe((res)=> {
        if (res.status==200) {
          this.url = res.data;

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
  onScheduleSubmit() {
    if (this.scheduleForm.invalid) {
      this.submitted = true;
      return;
    }

this.scheduleReq.id = this.currentCandidate.id;
this.scheduleReq.scheduled = this.scheduleDate+ " "+this.scheduleTime;

    this.http.PostDefault('/candidate/schedule',this.scheduleReq)
      .subscribe((res)=> {
        if (res.status==200) {
          this.onLoad();
          this.scheduleForm.reset();
          this.closebutton.nativeElement.click();

          this.http.alertSuccess("Candidate Schedule request submitted");
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

  onClickSchedule(i: any) {
    this.currentCandidate = i;
  }


  showCandidates(job) {
    this.candidates = job.candidates;

  }



}
