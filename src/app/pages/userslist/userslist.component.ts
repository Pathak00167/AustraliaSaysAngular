import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [SidenavComponent, NavComponent,CommonModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent  implements OnInit{
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsersList().subscribe(
      data => {
        this.users = data;
        console.log(data)
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }
}