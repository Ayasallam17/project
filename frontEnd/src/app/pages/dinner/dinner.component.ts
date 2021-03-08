import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css']
})
export class DinnerComponent implements OnInit {
  allMeal:any = []
  constructor(private _meal:UserService) { }

  ngOnInit(): void {
    this.getAlldinnerMeals()
  }
  getAlldinnerMeals(){ 
    this._meal.showAllDinnerMeals().subscribe(
      res=>{
        //console.log(res)
        this.allMeal = res.data
  
      }
    )}
}
