import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from './services/user/user.service';
import { WorkerService } from './services/worker/worker.service';


@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor( private _worker:WorkerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    //console.log("hello from interceptor")
    const token_worker = localStorage.getItem('token')
    if( token_worker == null){
    const token = "Bearer " + this._worker.token
    console.log( "header token" + token)
    request = request.clone({
      headers:request.headers.set('Authorization', token)
    })
    }
    else{
    const bn = "Bearer " + token_worker
    //console.log( "login token" +  bn)
    request = request.clone({
      headers:request.headers.set('Authorization', bn)
    })
    }
  return next.handle(request);
  }
}
