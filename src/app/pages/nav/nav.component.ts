import { Component,OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  notifications: any[] = [];
  notificationCount: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadNotifications();
    setInterval(() => {
      this.loadNotifications(); // Poll every 5 seconds
    }, 15000);
  }
  

  loadNotifications(): void {
    this.apiService.getNotifications().subscribe(
      (data: any[]) => {
        this.notifications = data;
        this.notificationCount = data.length; 
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  clearAllNotifications() {debugger
    this.apiService.clearAllNotifications().subscribe(response => {
      // Handle the response
      this.loadNotifications(); // Reload notifications to update the view
    });
  }
}