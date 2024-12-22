import { Component } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";
import { UsersidebarComponent } from "../usersidebar/usersidebar.component";
import { FooterComponent } from '../../pages/footer/footer.component';
import { SidenavComponent } from '../../pages/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [UsernavComponent, RouterModule,FooterComponent,SidenavComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {
  
}
