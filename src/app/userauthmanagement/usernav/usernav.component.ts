import { environment } from './../../../environments/environment';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
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
export class UsernavComponent implements OnInit {
  UserProfile: any = {}; 
 notifications: any[] = [];
  notificationCount: number = 0;
  userId: string = "";
  apibaseurl:string=environment.apiUrl
  baseurl:string=environment.imageUrl
  

  constructor(
    private apiService: ApiService,
  private notificationService:NotificationService,
private toastrService:ToastrService) {}



ngOnInit(): void {
  // Access the user info from the signal via ApiService
  this.UserProfile = this.apiService.getUserInfo()(); // Call the signal as a function to get its value
  console.log('Logged-in user:', this.UserProfile);
}

  
  

 

  clearAllNotifications() {debugger
    this.apiService.clearAllNotifications().subscribe(response => {

    });
  }
}