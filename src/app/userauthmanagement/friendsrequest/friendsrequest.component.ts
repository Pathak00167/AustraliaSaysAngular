
import { HubConnection } from '@microsoft/signalr';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { ChatHubService } from '../../shared/Services/chat-hub.service';
import { UsernavComponent } from '../usernav/usernav.component';
import { UserfooterComponent } from '../userfooter/userfooter.component';
import { UsersidebarComponent } from '../usersidebar/usersidebar.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-friendsrequest',
  standalone: true,
  imports: [CommonModule,UsernavComponent,UserfooterComponent,UsersidebarComponent],
  templateUrl: './friendsrequest.component.html',
  styleUrl: './friendsrequest.component.css'
})
export class FriendRequestComponent implements OnInit {
  pendingRequests: any[] = [];
  usersToSendRequest: any[] = [];
  userId: string = "";
  baseurl:string=environment.imageUrl  //  192.168.47.217
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
     this.apiService.getPendingRequests(this.userId).subscribe({
      next: (data) => {
        this.pendingRequests = data;
        console.log("Pending Requests"+data)
      },
      error: (error) => {
        console.error('Error fetching random users:', error);
        this.toastrService.error('Failed to load recent chats');
      }
     })
    ];
  }

  // Accept request logic
  acceptRequest(senderId: string) {debugger
    console.log(`Accepted request: ${senderId}`);
    const acceptRequest = { senderId: senderId, receiverId: this.userId };
    this.apiService.acceptFriendRequest(acceptRequest).subscribe(
      (response) => {
        this.hubService.sendMessage(senderId, `Your Friend Request is Accepted By the${this.userId}`)
          .then(() => this.toastrService.success('Friend request sent and notification delivered'))
          .catch((err:any) => this.toastrService.error('Failed to deliver friend request notification'));
      },
      (error) => 

        this.toastrService.error('Connection Issue Please try again later')
    );
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== senderId);
  }

  // Decline request logic
  declineRequest(senderId: string) {
    console.log(`Declined request: ${senderId}`);
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== senderId);
    const declinefriendRequest = { senderId: senderId, receiverId: this.userId };
    this.apiService.declineFriendRequest(declinefriendRequest).subscribe(
      (response) => {
        this.hubService.sendMessage(senderId, `Your Friend Request is Rejected By the${this.userId}`)
          .then(() => this.toastrService.success('Friend request Declined successfully'))
          .catch((err:any) => this.toastrService.error('Failed to deliver friend request notification'));
      },
      (error) => 

        this.toastrService.error('Connection Issue Please try again later')
    );
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
  
  

  cancelFriendRequest(senderId:string){
    const friendRequestData = { senderId: senderId, receiverId: this.userId };
    
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
