import { Component } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [UsernavComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {

}
