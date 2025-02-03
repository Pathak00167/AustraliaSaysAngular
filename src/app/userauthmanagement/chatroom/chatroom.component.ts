import { Component } from '@angular/core';
import { UsernavComponent } from '../usernav/usernav.component';
import { SidenavComponent } from '../../pages/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [UsernavComponent,SidenavComponent,CommonModule,FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent {
  messages = [
    { author: 'User1', text: 'Hello!', timestamp: new Date() },
    { author: 'User2', text: 'Hi there!', timestamp: new Date() }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        author: 'You',
        text: this.newMessage,
        timestamp: new Date()
      });
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}
