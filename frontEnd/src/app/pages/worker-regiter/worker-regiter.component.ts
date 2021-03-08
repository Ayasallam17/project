import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormArray , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from './../../services/worker/worker.service';


@Component({
  selector: 'app-worker-regiter',
  templateUrl: './worker-regiter.component.html',
  styleUrls: ['./worker-regiter.component.css']
})
export class WorkerRegiterComponent implements OnInit {
  flag :any = null
  registerForm = new FormGroup({
    user_id:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    phone:new FormControl(''),
    addresses:new FormGroup({
      addr_type:new FormControl(''),
      details:new FormControl(''),
    }),
    route:new FormControl('')
  })
  userData: any
  constructor(private _worker:WorkerService , private router:Router) { }

  ngOnInit(): void {
  }
  get user_id(){ return this.registerForm.get('user_id') }
  get password(){return this.registerForm.get('password')}
  get phone(){return this.registerForm.get('phone')}
  get route(){return this.registerForm.get('route') }
  handelRegister(){
    if(this.registerForm.valid){
      this.userData = this.registerForm.value
      this._worker.registerworker(this.userData).subscribe(
        res=>{ this.flag = true
          this.router.navigateByUrl('worker_login')
        },
        err=>{this.flag= false},
        ()=>{console.log(3)}   
      )
    }else{
      console.log('enter data not valid')
    }
}
  

}
