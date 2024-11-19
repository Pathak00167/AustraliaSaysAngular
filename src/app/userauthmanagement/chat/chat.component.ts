import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { UsernavComponent } from '../usernav/usernav.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,UsernavComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

constructor( 
  private apiService:ApiService
){

}
users = [
  {
    name: 'Kate',
    age: 32,
    imageUrl: 'path-to-kate-image.jpg',
    online: false,
    lastMessage: 'Lorem ipsum dolor sit amet...'
  },
  {
    name: 'Eve',
    age: 27,
    imageUrl: 'path-to-eve-image.jpg',
    online: true,
    lastMessage: 'Lorem ipsum dolor sit amet...'
  },
  {
    name: 'Suzane',
    age: 33,
    imageUrl: 'path-to-suzane-image.jpg',
    online: false,
    lastMessage: 'Lorem ipsum dolor sit amet...'
  },
  {
    name: 'John',
    age: 28,
    imageUrl: 'path-to-john-image.jpg',
    online: true,
    lastMessage: 'Lorem ipsum dolor sit amet...'
  }
];
}
