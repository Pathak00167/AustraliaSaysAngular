import { Component,OnInit } from '@angular/core';
import { UsernavComponent } from "../usernav/usernav.component";
import { CommonModule } from '@angular/common';

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

  constructor() { }

  ngOnInit(): void {
    // Fetch pending requests
    this.pendingRequests = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];

    // Fetch users to send friend requests
    this.usersToSendRequest = [
      { id: 3, name: 'Michael Johnson' },
      { id: 4, name: 'Emily Davis' },
      { id: 5, name: 'David Brown' },
      { id: 6, name: 'Sarah Wilson' },
      { id: 7, name: 'James Taylor' }
    ];
  }

  acceptRequest(requestId: number) {
    console.log(`Accepted request: ${requestId}`);
    // Logic to accept the request
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
  }

  declineRequest(requestId: number) {
    console.log(`Declined request: ${requestId}`);
    // Logic to decline the request
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
  }

  sendFriendRequest(userId: number) {
    console.log(`Sent friend request to user: ${userId}`);
    // Logic to send a friend request
  }

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
