import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/Models/User";
import { HttpService } from "src/app/Services/http-service.service";
import { LoginService } from "src/app/Services/login.service";
import { environment } from "src/environments/environment";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {debounceTime, first} from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  Username: string;
  Password: string;
  returnUrl: string;
  loginForm: FormGroup;
  User: User = new User();
  submitted = false;
  btnText = 'Sign in';

  constructor(
    private httpClint: HttpClient,
    private http: HttpService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
   // this.loginService.logout();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/medical";

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onRegisterClick(){
    this.router.navigate(['register']);

  }
  Login() {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }
    this.User.username = this.f.username.value;
    this.User.password = this.f.password.value;

    this.http.PostDefault('/login', this.User)
      .subscribe((res: HttpResponse<any>)=> {
        if (res.status==200) {
          this.loginService.login( res.headers.get("Authorization"));
          this.http.loading(false);

          this.router.navigate(['employer/manageJob']);;
        } else {
          this.http.alertError("Invalid Username or password! ");
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
