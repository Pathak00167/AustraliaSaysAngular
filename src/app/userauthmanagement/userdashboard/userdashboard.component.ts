import { Component } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";
import { UsersidebarComponent } from "../usersidebar/usersidebar.component";

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [UsernavComponent, UsersidebarComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {

}
