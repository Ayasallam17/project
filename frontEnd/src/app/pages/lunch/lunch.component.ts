import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {
  allMeal:any = []
  constructor(private _meal:UserService) { }

  ngOnInit(): void {
    this.getAllLunchMeals()
  }
  getAllLunchMeals(){ 
    this._meal.showAllLunchMeals().subscribe(
      res=>{
        //console.log(res)
        this.allMeal = res.data
  
      }
    )}
}
