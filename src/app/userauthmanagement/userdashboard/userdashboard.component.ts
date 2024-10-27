import { Component } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";
import { UsersidebarComponent } from "../usersidebar/usersidebar.component";
import { SidenavComponent } from "../../pages/sidenav/sidenav.component";

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [UsernavComponent, UsersidebarComponent, SidenavComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {
  
}
