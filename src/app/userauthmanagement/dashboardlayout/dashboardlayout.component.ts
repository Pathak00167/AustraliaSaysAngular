import { UsersidebarComponent } from './../usersidebar/usersidebar.component';
import { Component } from '@angular/core';
import { UsernavComponent } from '../usernav/usernav.component';
import { UserfooterComponent } from '../userfooter/userfooter.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboardlayout',
  standalone: true,
  imports: [UsernavComponent,UserfooterComponent,UsersidebarComponent,RouterOutlet],
  templateUrl: './dashboardlayout.component.html',
  styleUrl: './dashboardlayout.component.css'
})
export class DashboardlayoutComponent {

}
