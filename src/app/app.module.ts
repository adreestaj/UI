import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { LoaderComponent } from './Shared/loader/loader.component';
import { LoginComponent } from './Shared/login/login.component';
import { Authguard } from './Services/authguard.service';
import { JwtInterceptor } from './Services/JwtInterceptor.service';
import {RegisterComponent} from './Shared/registration/register.component';
import {CreateJobComponent} from './employer/createJob/createJob.component';
import {SidebarComponent} from './Shared/sidebar/sidebar.component';
import {ManageJobComponent} from './employer/manageJob/manageJob.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoaderComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    CreateJobComponent,
    ManageJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPrintModule,
    AngularEditorModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()

  ],
  providers: [
    DatePipe,
    Authguard,
 //   JwtInterceptor
 { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
