import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../shared/notification.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usernav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.css'
})
export class UsernavComponent {
  UserProfile: any = {}; 
 notifications: any[] = [];
  notificationCount: number = 0;
  userId: string = "";
  apibaseurl:string="http://192.168.164.217:5112/"

  constructor(
    private apiService: ApiService,
  private notificationService:NotificationService,
private toastrService:ToastrService) {}

  ngOnInit(): void {debugger
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      console.log(notifications)
    });
   this.userId=this.apiService.getUserIdFromToken()
   if (this.userId) {debugger
    this.apiService.GetUserProfile(this.userId).subscribe({
      next: (data) => {
        this.UserProfile = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching random users:', error);
        this.toastrService.error('Failed to load random users');
      }
    });
  } else {
    this.toastrService.error('User not authenticated or invalid token');
  }

  }
  

 

  clearAllNotifications() {debugger
    this.apiService.clearAllNotifications().subscribe(response => {

    });
  }
}