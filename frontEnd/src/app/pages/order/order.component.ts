import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id:any
  data:any
  flag: any;
  message: any;
  orderData:any
  orderForm = new FormGroup({
    count:new FormControl('' , [Validators.required , Validators.pattern("[1-9]*")
    ,Validators.max(10), Validators.min(1)]),

    name:new  FormControl('',[ Validators.required]),
    address:new  FormControl('',[ Validators.required  ,Validators.pattern("[a-zA-Z0-9]*")]),
    phone:new FormControl('',[Validators.required])
  })
  constructor( private _order:UserService , private _activatedRoute : ActivatedRoute ,
     private _user:UserService , private router:Router) { 
       
     }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id')
    this.handleOrder(this.id)
  }
  handleOrder(id){
    this._order.order(id).subscribe(
      res=>{ 
        this.data = res.data
      }
    )}
    get count(){return this.orderForm.get('count')}
    get adress(){return this.orderForm.get('address')}
    get phone(){return this.orderForm.get('phone')}
    get name(){return this.orderForm.get('name')}
    handelConfirm(){ 
       if(this.orderForm.valid){ 
          this.orderData = this.orderForm.value
          this.orderData["mealname"] = this.data.name
          this.orderData["mealdetails"] = this.data.details
          
          this._user.confirmOrder(this.orderData).subscribe(
          res=>{
            this.flag = true
            this.message = res.message
            console.log(this.message)
            //this.router.navigateByUrl('')
          },
          err=>{ 
            this.flag = false
            this.message = err.error.data
            console.log(err)
          })
        }else{
          this.flag=false
          this.message = "invalid data"
    
        }
       
    }

}
