import { Component } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";
import { UsersidebarComponent } from "../usersidebar/usersidebar.component";
import { RouterModule } from '@angular/router';
import { UserfooterComponent } from '../userfooter/userfooter.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [RouterModule, UsernavComponent,UsersidebarComponent,UserfooterComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {
  
}
