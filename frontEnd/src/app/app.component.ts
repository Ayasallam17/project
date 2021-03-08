import { Component } from '@angular/core';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';
}
