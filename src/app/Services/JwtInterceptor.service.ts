import { Injectable } from '@angular/core';
    import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
    import { Observable } from 'rxjs';

    import { HttpService } from './http-service.service';

    @Injectable()
    export class JwtInterceptor implements HttpInterceptor {
       

      constructor(private authenticationService: HttpService) {
       
      }

      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
     
        let currentUser = this.authenticationService.getToken();
        if (currentUser) {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' +  currentUser
            }
          });
        }

        return next.handle(request);
      }
    }