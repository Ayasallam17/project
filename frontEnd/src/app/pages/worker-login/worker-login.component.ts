import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from './../../services/worker/worker.service';
@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css']
})
export class WorkerLoginComponent implements OnInit {
  flag : any = null
  loginForm = new FormGroup({
    id:new  FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  constructor(private _user:WorkerService, private router:Router) { }

  ngOnInit(): void {
  }
  get id(){return this.loginForm.get('id')}
  get password(){return this.loginForm.get('password')}
handelLogin(){
if(this.loginForm.valid){
  console.log(this.loginForm.value)
this._user.loginworker(this.loginForm.value.id, this.loginForm.value.password).subscribe(
  res=>{
    this.flag = true
    this._user.token=res.token
    localStorage.setItem('token',res.token) 
    if(res.route == 'admin'){ 
    this.router.navigateByUrl('adminHome') }
    else if(res.route == 'worker'){
      this.router.navigateByUrl('workerHome')
    }else alert("you hack")
  },
  err=>{
    console.log(err)
    this.flag = false
  })
}
else console.log('enter data is not invalide')
}

}
