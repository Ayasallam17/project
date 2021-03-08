import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private _user:UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //console.log("hello from user interceptor")
    const token_user = localStorage.getItem('token')
    if( token_user == null){
    const token = "Bearer " + this._user.token
    //console.log( "header token" + token)
    request = request.clone({
      headers:request.headers.set('Authorization', token)
    })
    }
    else{
    const token = "Bearer " + token_user
    //console.log( "login token" + token)
    request = request.clone({
      headers:request.headers.set('Authorization', token)
    })
    }
    return next.handle(request);
  }
}
