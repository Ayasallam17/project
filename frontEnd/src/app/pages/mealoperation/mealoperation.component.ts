import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker/worker.service';

@Component({
  selector: 'app-mealoperation',
  templateUrl: './mealoperation.component.html',
  styleUrls: ['./mealoperation.component.css']
})
export class MealoperationComponent implements OnInit {
  id:any =''
  data:any
  flag: any;
  message: any;

  mealForm = new FormGroup({
    name:new FormControl('',[Validators.required]),
    details:new FormControl('',[Validators.required ]),
    price:new FormControl('',[Validators.required]),
    cat:new FormControl('' , [Validators.required])
  })

  constructor( private _meal:WorkerService , private _activatedRoute : ActivatedRoute ,
              private router:Router) { }


  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id')
    this.handleMeal(this.id)
    //this.onUpload()
  }

  handleMeal(id){ 
    this._meal.getmeal(id).subscribe(
      res=>{ 
        this.data = res.data
      }
    )}
  get name(){ return this.mealForm.get('name') }
  get details(){ return this.mealForm.get('details') }
  get price(){ return this.mealForm.get('price') }
  get cat(){ return this.mealForm.get('cat') }

  selectedfile:any =''
  onFileChange(event){
    this.selectedfile = event.target.files[0]
    console.log(this.selectedfile)
  }
    onUpload(){
      const  uploadData  = new FormData()
      uploadData.append('meal' ,this.selectedfile, this.selectedfile.name)
      uploadData.append("name" ,this.mealForm.value.name)
      uploadData.append("details" ,this.mealForm.value.details)
      uploadData.append("price" ,this.mealForm.value.price)
      uploadData.append("cat" ,this.mealForm.value.cat)
      console.log("first")
      this._meal.updatemeal(uploadData ,this.id).subscribe(
        res=>{
          console.log(res) 
        },
        err=>{
          console.log(err)
        }
      )
    }

}
