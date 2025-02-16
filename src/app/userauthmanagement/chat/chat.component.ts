import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { UsernavComponent } from '../usernav/usernav.component';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserfooterComponent } from '../userfooter/userfooter.component';
import { UsersidebarComponent } from '../usersidebar/usersidebar.component';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,UsernavComponent,UserfooterComponent,UsersidebarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  userFriends: any[] = [];
  userId:string=''
  apibaseurl:string="http://192.168.137.217:5112/"  //192.168.137.217
constructor( 
  private apiService:ApiService,private toastrService:ToastrService,private router: Router
){
 
}
ngOnInit(): void {debugger
  this.userId=this.apiService.getUserIdFromToken()
  
    this.apiService.GetUserFriends(this.userId).subscribe({
     next: (data) => {
       this.userFriends = data;
       console.log(data)
     },
     error: (error) => {
       console.error('Error fetching users Friends:', error);
       this.toastrService.error('Failed to load random users');
     }
    })
}

openUserDetail(user:any){debugger
this.router.navigate(['chat-room', user])
}
// users = [
//   {
//     name: 'Kate',
//     age: 32,
//     imageUrl: 'path-to-kate-image.jpg',
//     online: false,
//     lastMessage: 'Lorem ipsum dolor sit amet...'
//   },
//   {
//     name: 'Eve',
//     age: 27,
//     imageUrl: 'path-to-eve-image.jpg',
//     online: true,
//     lastMessage: 'Lorem ipsum dolor sit amet...'
//   },
//   {
//     name: 'Suzane',
//     age: 33,
//     imageUrl: 'path-to-suzane-image.jpg',
//     online: false,
//     lastMessage: 'Lorem ipsum dolor sit amet...'
//   },
//   {
//     name: 'John',
//     age: 28,
//     imageUrl: 'path-to-john-image.jpg',
//     online: true,
//     lastMessage: 'Lorem ipsum dolor sit amet...'
//   }
// ];
}
