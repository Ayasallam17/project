import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/interfaces/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  commonUrl = 'http://localhost:3000'
  public token =null
  private isLogged: boolean
  constructor( private _http:HttpClient ) { 
    this.isLogged=false
  }

  registerUser(userData:User):Observable<any>{
    return this._http.post(`${this.commonUrl}/user/register` , userData)
  }
  loginUser(email:string, password:string):Observable<any>{
    this.isLogged = true
    const data={email, password}
    return this._http.post(`${this.commonUrl}/user/login`, data)
  }
  showAllDinnerMeals():Observable<any>{
    const cat = "dinner"
    const data = {cat}
    return this._http.post(`${this.commonUrl}/showalldinner` , data)
  } 
  showAllBreakfastMeals():Observable<any>{
    const cat = "breakfast"
    const data = {cat}
    return this._http.post(`${this.commonUrl}/showallbreakfast` , data)
  } 
  showAllLunchMeals():Observable<any>{
    const cat = "lunch"
    const data = {cat}
    return this._http.post(`${this.commonUrl}/showalllunch` , data)
  } 
  order(id):Observable<any>{
    return this._http.post(`${this.commonUrl}/orderitem/${id}` , '')
  
  }
  confirmOrder(orderData):Observable<any>{
    return this._http.post(`${this.commonUrl}/confirmorder` , orderData)
  }
  isLoggedTest(){
    return this.isLogged
  }
  profile():Observable<any>{
    return this._http.get(`${this.commonUrl}/profile`)
  }

}
