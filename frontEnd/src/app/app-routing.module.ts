import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './pages/user-register/user-register.component'
import {HomeComponent } from './pages/home/home.component'
import { WorkerRegiterComponent } from './pages/worker-regiter/worker-regiter.component';
import { UserLoginComponent } from './pages/user-login/user-login.component'
import { WorkerLoginComponent } from './pages/worker-login/worker-login.component';
import { MealComponent } from './pages/meal/meal.component';
import { OrderComponent } from './pages/order/order.component';
import { BreakfastComponent } from './pages/breakfast/breakfast.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { WorkerHomeComponent } from './pages/worker-home/worker-home.component';
import { MyguardGuard } from './guard/myguard.guard';
import { DinnerComponent } from './pages/dinner/dinner.component';
import { LunchComponent } from './pages/lunch/lunch.component';
import { AllmealComponent } from './pages/allmeal/allmeal.component';
import { MealoperationComponent } from './pages/mealoperation/mealoperation.component';
import { DiscountComponent } from './pages/discount/discount.component';

const routes: Routes = [
  {path : "home", component:HomeComponent },
  //{path : "", component:HomeComponent },
  {path:"register" , component: UserRegisterComponent},
  {path : "worker_register" , component:WorkerRegiterComponent},
  {path : "login" , component:UserLoginComponent},
  {path : "worker/login" , component:WorkerLoginComponent},
  {path : "add_meal" , component:MealComponent },
  {path : "breakfast" , component:BreakfastComponent },
  {path : "breakfast/:id" , component:OrderComponent } ,//canActivate:[MyguardGuard] } ,
  {path : "adminHome" , component:AdminHomeComponent } ,
  {path : "workerHome" , component:WorkerHomeComponent } ,
  {path : "dinner" , component:DinnerComponent },
  {path : "lunch" , component:LunchComponent },
  {path :  "allmeal" , component:AllmealComponent},
  {path :  "allmeal/:id" , component:MealoperationComponent},
  {path :  "discount" , component:DiscountComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
