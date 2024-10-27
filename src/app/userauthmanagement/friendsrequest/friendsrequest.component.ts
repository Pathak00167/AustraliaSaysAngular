import { Component,OnInit } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friendsrequest',
  standalone: true,
  imports: [UsernavComponent,CommonModule],
  templateUrl: './friendsrequest.component.html',
  styleUrl: './friendsrequest.component.css'
})
export class FriendRequestComponent implements OnInit {
  pendingRequests: any[] = [];
  usersToSendRequest: any[] = [];
  userId: string = "";
  baseurl:string="https://localhost:7237/"
  senderId:string="";
  recieverId:string="";
  sentRequests: { [userId: string]: boolean } = {};


  constructor(private apiService: ApiService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.userId = this.apiService.getUserIdFromToken();

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
  sendFriendRequest(userId: string) {debugger
    this.senderId = this.apiService.getUserIdFromToken();
    console.log(`Sender Id:${this.senderId}`)
    console.log(`Sent friend request to user: ${userId}`);
    const friendRequestData = {
      senderId: this.senderId,
      receiverId: userId
    };
    this.apiService.sendFriendRequest(friendRequestData).subscribe(
      (response) => {
        console.log(`Friend request sent successfully to user: ${userId}`);
        this.sentRequests[userId] = true;
      },
      (error) => {
        console.error('Failed to send friend request', error);
      }
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
