import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-allmeal',
  templateUrl: './allmeal.component.html',
  styleUrls: ['./allmeal.component.css']
})
export class AllmealComponent implements OnInit {

  allMeal:any
  constructor(private _meal:UserService) { }
  ngOnInit(): void {
    this.getAllbeakfastMeals()
  }

  getAllbeakfastMeals(){ 
    this._meal.showAllBreakfastMeals().subscribe(
      res=>{
        this.allMeal = res.data
        console.log(res)
      },
      err=>{
        console.log(err)
      }
  )}

}
