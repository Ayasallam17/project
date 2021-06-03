import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {
  allMeal:any
  apiurl = 'localhost:3000/'
  constructor(private _meal:UserService) { }

  ngOnInit(): void {
    this.getAllbeakfastMeals()
  }
  getAllbeakfastMeals(){ 
    this._meal.showAllBreakfastMeals().subscribe(
      res=>{
        this.allMeal = res.data
        // this.allMeal.map(image=>{
        //   image.img= `${this.apiurl}${image.img}`.replace(/\\/g,"/")
        //   console.log(image.img)
        //   return image
        // })
        // console.log(res)
      },
      err=>{
        console.log(err)
      }
  )}
}