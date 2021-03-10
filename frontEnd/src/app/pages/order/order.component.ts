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
  countorder:number =0
  id:any
  data:any
  flag: any;
  message: any;
  orderData:any
  userdata:any
  disableOrder:boolean= false
  orderForm = new FormGroup({
    count:new FormControl('' , [Validators.required
    ,Validators.max(10), Validators.min(1)]),
    address:new  FormControl(''),
    phone:new FormControl(''),
    message:new FormControl('')
  })
  constructor( private _order:UserService , private _activatedRoute : ActivatedRoute ,
    private _user:UserService , private router:Router) { 
       
    }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id')
    this.handleOrder(this.id)
    this.userData()
  }
  handleOrder(id)
  {
    this._order.order(id).subscribe(
      res=>{ 
        this.data = res.data
      }
    )
  }
  userData(){
    this._user.profile().subscribe(
      res=>{
        this.userdata = res
        console.log(this.userdata.user_name)
      }
    )
  }
    get count(){return this.orderForm.get('count')}
    get adress(){return this.orderForm.get('address')}
    get phone(){return this.orderForm.get('phone')}
    get usermessage(){return this.orderForm.get('message')}
    handelConfirm(){ 
      console.log(this.orderForm.value.message)
       if(this.orderForm.valid){ 
          this.orderData = this.orderForm.value
          this.orderData["mealname"] = this.data.name
          this.orderData["mealdetails"] = this.data.details
          this.orderData["username"] = this.userdata.user_name
          this.orderData["usermessage"] = this.orderForm.value.message
          if(this.orderForm.get('phone') && this.userdata.phone != null){
            this.orderData["phone"] = this.userdata.phone
          }
          else{
            this.flag = false
            this.message = "you should provide phone you don't enter phone in registeration"
          }
          this._user.confirmOrder(this.orderData).subscribe(
          res=>{
            this.flag = true
            this.message = res.message
          },
          err=>{ 
            this.flag = false
            this.message = err.error.data
            this.disableOrder = true
            console.log(err)
          })
        }else{
          this.flag=false
          this.message = "invalid data"
    
        }
       
    }

}
