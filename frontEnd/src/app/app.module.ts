import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// import {NgxPaginationModule} from 'ngx-pagination';
// import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkerRegiterComponent } from './pages/worker-regiter/worker-regiter.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { WorkerLoginComponent } from './pages/worker-login/worker-login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { MealComponent } from './pages/meal/meal.component';
import { Err404Component } from './err404/err404.component';
import { BreakfastComponent } from './pages/breakfast/breakfast.component';
import { DinnerComponent } from './pages/dinner/dinner.component';
import { LunchComponent } from './pages/lunch/lunch.component';
import { OrderComponent } from './pages/order/order.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { WorkerHomeComponent } from './pages/worker-home/worker-home.component';
import { AllmealComponent } from './pages/allmeal/allmeal.component';
import { MealoperationComponent } from './pages/mealoperation/mealoperation.component';
import { ButtonComponent } from './pages/button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    HomeComponent,
    WorkerRegiterComponent,
    UserLoginComponent,
    WorkerLoginComponent,
    NavComponent,
    FooterComponent,
    MealComponent,
    Err404Component,
    BreakfastComponent,
    DinnerComponent,
    LunchComponent,
    OrderComponent,
    AdminHomeComponent,
    WorkerHomeComponent,
    AllmealComponent,
    MealoperationComponent,
    ButtonComponent,
    
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    PaginationModule,
    // NgxPaginationModule,
    // ToastrModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
          }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
