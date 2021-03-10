import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { WorkerService } from 'src/app/services/worker/worker.service';

@Component({
  selector: 'app-allmeal',
  templateUrl: './allmeal.component.html',
  styleUrls: ['./allmeal.component.css']
})
export class AllmealComponent implements OnInit {
  flag= false
  breakfastMeal:any
  lunchMeal:any
  dinnerMeal:any

  constructor(private _allmeal:UserService ,private _meal:WorkerService) { }
  ngOnInit(): void {
    this.getAllbeakfastMeals()
    this.getAllLunchMeals()
    this.getAllDinnerMeals()
  }

  getAllbeakfastMeals(){ 
    this._allmeal.showAllBreakfastMeals().subscribe(
      res=>{
        this.breakfastMeal = res.data
      },
      err=>{
        console.log(err)
      }
  )}
  getAllLunchMeals(){ 
    this._allmeal.showAllLunchMeals().subscribe(
      res=>{
        this.lunchMeal = res.data
      },
      err=>{
        console.log(err)
      }
  )}
  getAllDinnerMeals(){ 
    this._allmeal.showAllDinnerMeals().subscribe(
      res=>{
        this.dinnerMeal = res.data
      },
      err=>{
        console.log(err)
      }
  )}

  delete(id:any){
    // console.log(id)
    if(confirm("Are you sure to delete this meal")) {
      this._meal.deleteMeal(id).subscribe(
        res=>{
          this.flag = true
          console.log(res)
        },
        err=>{
          console.log(err)
        }
    )
    } 
}


}
