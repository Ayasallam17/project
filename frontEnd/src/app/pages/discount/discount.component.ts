import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker/worker.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  flag :any = null
  data:any
  message :string=""
  discountForm = new FormGroup({
    precent:new FormControl('',[Validators.required]),
    cat:new FormControl('' , [Validators.required])
  })

  constructor(private _mealDiscount:WorkerService , private router:Router) { }

  ngOnInit(): void {
  }
  get price(){ return this.discountForm.get('precent') }
  get cat(){ return this.discountForm.get('cat') }
  handleDiscount(){
    console.log(this.discountForm.value)
    this._mealDiscount.addDiscount(this.discountForm.value).subscribe(
      res=>{
        this.flag=true
        this.message= res.message
        console.log(res)
      },
      err=>{
        this.flag=false
        this.message= err.data;
        console.log(err)
      }
    )
  }

}
