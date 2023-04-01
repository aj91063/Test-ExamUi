import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import{Observable} from "rxjs";
import { LoginService } from './login.service';
//const TOKEN_HEADER='Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(private login:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.login.getToken(); // you probably want to store it in localStorage or something

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }

}

// export const authIntercepterProviders=[
//   {
//     provider:HTTP_INTERCEPTORS,
//     useClass:AuthInterceptor,
//     multi:true
//   }
// ]
