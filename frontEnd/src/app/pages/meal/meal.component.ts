import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormArray , FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { Meal } from 'src/app/interfaces/meal';
import { WorkerService } from 'src/app/services/worker/worker.service';
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  flag :any = null
  data:any
  message :string=""
 mealForm = new FormGroup({
     name:new FormControl('',[Validators.required]),
    details:new FormControl('',[Validators.required ]),
    price:new FormControl('',[Validators.required]),
    cat:new FormControl('' , [Validators.required])
  })

  constructor( private _meal:WorkerService , private router:Router ) { }

  ngOnInit(): void {
   this.onUpload()
  }
  get name(){ return this.mealForm.get('name') }
  get details(){ return this.mealForm.get('details') }
  get price(){ return this.mealForm.get('price') }
  get cat(){ return this.mealForm.get('cat') }
  selectedfile:any ='' 
  onFileChange(event){
    this.selectedfile = event.target.files[0]
    //console.log(this.selectedfile)
  }
  onUpload(){
    //console.log(this.mealForm.value)
    const  uploadData  = new FormData()
    uploadData.append('meal' , this.selectedfile, this.selectedfile.name)
    uploadData.append("name" ,this.mealForm.value.name)
    uploadData.append("details" ,this.mealForm.value.details)
    uploadData.append("price" ,this.mealForm.value.price)
    uploadData.append("cat" ,this.mealForm.value.cat)
    this._meal.addmeal(uploadData).subscribe(
      res=>{
        console.log(res.data)
    
      },
      err=>{
        console.log(err)
      }
    )
  }

  //   if(this.mealForm.valid){
  //     this.mealData = this.mealForm.value
  //     console.log(this.mealData)
  //     this._meal.addmeal(this.mealData).subscribe(
  //       res=>{ this.flag = true
  //         this.router.navigateByUrl('')
  //         console.log(res.data.name)
  //       },
  //       err=>{this.flag= false
  //         console.log(err.error.data)
  //       },
  //       ()=>{console.log(3)}   
  //     )
  //  }
  //  else{
  //    console.log("input data is invalid")
  //  }
  // }
 
}