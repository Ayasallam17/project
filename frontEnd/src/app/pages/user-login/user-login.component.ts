import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  flag : any = null
  message:any
  loginForm = new FormGroup({
    email:new  FormControl('',[Validators.email, Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  constructor(private _user:UserService, private router:Router) { }
   
  ngOnInit(): void {
  }
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}
handelLogin(){
if(this.loginForm.valid){
this._user.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
  res=>{
    this._user.token=res.token
    localStorage.setItem('token', res.token)
    //console.log("user token"+res.token)
    this.router.navigateByUrl('home')
    this.flag = true
  },
  err=>{ 
    this.flag = false
    this.message = err.error.data;
    
    console.log(this.message)
  }
  )
}
else this.message ="invalid data"
}
  
}
