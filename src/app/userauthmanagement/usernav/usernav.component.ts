import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-usernav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.css'
})
export class UsernavComponent {
 notifications: any[] = [];
  notificationCount: number = 0;

  constructor(
    private apiService: ApiService,
  private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }
  

 

  clearAllNotifications() {debugger
    this.apiService.clearAllNotifications().subscribe(response => {

    });
  }
}