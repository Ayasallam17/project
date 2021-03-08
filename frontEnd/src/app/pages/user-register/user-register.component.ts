import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user/user.service';
import { FormControl, FormGroup, Validators , FormArray , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  flag :any = null
  registerForm = new FormGroup({
    user_name:new FormControl('',[Validators.required] ),
    email:new FormControl('',[Validators.required , Validators.email]),
    password:new FormControl('',[Validators.required , Validators.minLength(7)]),
    phone:new FormControl('')
  })
  userData: any
  constructor( private _user:UserService ,private router:Router ) { }

  ngOnInit(): void {
  }
  get user_name(){ return this.registerForm.get('user_name') }
  get email(){ return this.registerForm.get('email') }
  get password(){return this.registerForm.get('password')}
  get phone(){return this.registerForm.get('phone')}
  message : any
  handelRegister(){
    if(this.registerForm.valid){
      this.userData = this.registerForm.value
      //console.log(this.userData)
      this._user.registerUser(this.userData).subscribe(
        res=>{
          this.flag = true
          //console.log(res)
          this.router.navigateByUrl('login')
        },
        err=>{
          this.flag= false
          this.message = err.error.data
          //console.log(err)
        },
        ()=>{console.log(3)}   
      )
   }else{

     console.log('data entered is invalide')
   }
  }
}
