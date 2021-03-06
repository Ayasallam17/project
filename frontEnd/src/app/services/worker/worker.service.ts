import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Worker } from './../../interfaces/worker';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  commonUrl = 'http://localhost:3000'
  public token = null
  private isLogged: boolean
  constructor(private _http:HttpClient) { 
    this.isLogged=false
  }
  //both worker and admin log
  registerworker(workerData:Worker):Observable<any>{
    return this._http.post(`${this.commonUrl}/worker_register`, workerData)
  }
  loginworker(user_id:string, password:string):Observable<any>{
    this.isLogged=true
    const data={user_id, password}
    return this._http.post(`${this.commonUrl}/worker/login`, data)
  }
  logoutworker():Observable<any>{
    this.isLogged=false
    return this._http.post(`${this.commonUrl}/worker/logout`, '')
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
  updatemeal(data , id):Observable<any>{
    return this._http.post(`${this.commonUrl}/updatemeal/${id}`,data) 
  }
  deleteMeal(id):Observable<any>{
    return this._http.post(`${this.commonUrl}/deletemeal/${id}`, '') 
  }
  addDiscount(data):Observable<any>{
    return this._http.post(`${this.commonUrl}/discount`, data) 
  }

  isLoggedTest(){
    return this.isLogged
  }

}
