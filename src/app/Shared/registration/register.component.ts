import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { User } from "src/app/Models/User";
import { HttpService } from "src/app/Services/http-service.service";
import { LoginService } from "src/app/Services/login.service";
import { environment } from "src/environments/environment";
import {HttpClient, HttpResponse} from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import {ConfirmedValidator} from './confirmed.validator';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  Username: string;
  Password: string;
  returnUrl: string;
  registerForm: FormGroup;
  user: User = new User();
  submitted = false;
  btnText = 'Sign in';
  confirmPassword: any;

  constructor(    private httpClint: HttpClient,
    private http: HttpService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService) {
   // this.loginService.logout();
  }

  ngOnInit() {
   // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/medical";

    this.registerForm = this.formBuilder.group({
      lastName: ["", [Validators.required]],
      company: ["", [Validators.required]],
      workPhone: [""],
      firstName: ["", [Validators.required]],
      jobTitle: ["", [Validators.required]],
      workEmail: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });


  }

  get f() {
    return this.registerForm.controls;
  }
  onLoginClick(){
    this.router.navigate(['login']);

  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.submitted = true;
      return;
    }
 /*   this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
*/
    this.http.loading(true);
    this.http.PostDefault('/register', this.user)
      .subscribe((res: HttpResponse<any>)=> {
        if (res.status==200) {
         // this.loginService.login( res.headers.get("Authorization"));
          this.http.loading(false);
          this.router.navigate(['/login']);
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
