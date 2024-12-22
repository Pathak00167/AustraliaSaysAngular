import { NavComponent } from './../../pages/nav/nav.component';
import { HubConnection } from '@microsoft/signalr';
import { Component,OnInit } from '@angular/core';
import { SidenavComponent } from '../../pages/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { ChatHubService } from '../../Services/chat-hub.service';

@Component({
  selector: 'app-friendsrequest',
  standalone: true,
  imports: [CommonModule,NavComponent,SidenavComponent],
  templateUrl: './friendsrequest.component.html',
  styleUrl: './friendsrequest.component.css'
})
export class FriendRequestComponent implements OnInit {
  pendingRequests: any[] = [];
  usersToSendRequest: any[] = [];
  userId: string = "";
  baseurl:string="http://192.168.26.217:5112/"  // 192.168.26.217
  senderId:string="";
  recieverId:string="";
  sentRequests: { [userId: string]: boolean } = {};


  constructor(private apiService: ApiService, private toastrService: ToastrService, private hubService:ChatHubService) {}

  ngOnInit(): void {
    if (!this.hubService.hubConnection || this.hubService.hubConnection.state !== 'Connected') {
      this.hubService.startConnection(); // Start SignalR connection only if it's not already started
    }
    // this.hubService.startConnection(); 
    this.userId = this.apiService.getUserIdFromToken();
    this.hubService.hubConnection.on('ReceiveNotification', (message: string) => {
      // Logic to handle incoming friend requests or notifications
      console.log('New notification:', message);
      this.toastrService.info(message);
    });

    if (this.userId) {debugger
      this.apiService.getRandomUsers(this.userId).subscribe({
        next: (data) => {
          this.usersToSendRequest = data;
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

    // Fetch pending friend requests (static data for now)
    this.pendingRequests = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
  }

  // Accept request logic
  acceptRequest(requestId: number) {
    console.log(`Accepted request: ${requestId}`);
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
  }

  // Decline request logic
  declineRequest(requestId: number) {
    console.log(`Declined request: ${requestId}`);
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
  }

  // Send friend request logic
  sendFriendRequest(userId: string) {
    this.senderId = this.apiService.getUserIdFromToken();
    const friendRequestData = { senderId: this.senderId, receiverId: userId };
  
    this.apiService.sendFriendRequest(friendRequestData).subscribe(
      (response) => {
        this.sentRequests[userId] = true;
        this.hubService.sendMessage(userId, 'You have a new friend request!')
          .then(() => this.toastrService.success('Friend request sent and notification delivered'))
          .catch((err:any) => this.toastrService.error('Failed to deliver friend request notification'));
      },
      (error) => this.toastrService.error('Failed to send friend request')
    );
  }
  
  

  cancelFriendRequest(userId:string){

  }

  // Shuffle users logic
  shuffleUsers() {
    this.usersToSendRequest = this.shuffleArray(this.usersToSendRequest);
  }

  // Shuffle array function
  shuffleArray(array: any[]): any[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
