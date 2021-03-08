import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { Worker } from './../../interfaces/worker';
import { Meal } from 'src/app/interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  commonUrl = 'http://localhost:3000'
  public token = null
  constructor(private _http:HttpClient) { }
  //both worker and admin log
  registerworker(workerData:Worker):Observable<any>{
    return this._http.post(`${this.commonUrl}/worker_register`, workerData)
  }
  loginworker(user_id:string, password:string):Observable<any>{
    const data={user_id, password}
    return this._http.post(`${this.commonUrl}/worker_login`, data)
  }
  //admin operations
  addmeal(data):Observable<any>{
    return this._http.post(`${this.commonUrl}/addmeal` ,data)
  }
  // workers routes
  getOrders():Observable<any>{
    return this._http.post(`${this.commonUrl}/showorders` , '')
  }
  deleteOrder(id):Observable<any>{
    return this._http.post(`${this.commonUrl}/deleteorder/${id}`,'')
  }

  getmeal(id):Observable<any>{
    return this._http.post(`${this.commonUrl}/getmeal/${id}`,'')
  }
  updatemeal(data):Observable<any>{
    return this._http.post(`${this.commonUrl}/updatemeal`,data)
  }
}
