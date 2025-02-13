import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/loader.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { UserdashboardComponent } from "./userauthmanagement/userdashboard/userdashboard.component";
import { ChatHubService } from './shared/Services/chat-hub.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './shared/notification.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularaustraliasays';
  isLoading$: Observable<boolean>;
  notifications: string[] = [];

  constructor(
    private loaderService: LoaderService,
    private chathub:ChatHubService,
    private toastrService:ToastrService,
    private notificationService:NotificationService) {
    this.isLoading$ = this.loaderService.isLoading$;
    // this.chathub.startConnection();
    if (this.chathub.hubConnection ) {
      this.chathub.hubConnection.on('ReceiveNotification', (message: string) => { 
        // Logic to handle incoming friend requests or notifications
        console.log('New notification:', message);
        this.notificationService.addNotification(message);
        this.toastrService.info(message);
      });
    }
    
    
  }
}
