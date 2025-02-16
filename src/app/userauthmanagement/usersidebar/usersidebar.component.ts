import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MessageCircleMore } from 'lucide-angular';

@Component({
  selector: 'app-usersidebar',
  standalone: true,
  imports: [RouterLink,LucideAngularModule],
  templateUrl: './usersidebar.component.html',
  styleUrl: './usersidebar.component.css'
})
export class UsersidebarComponent {

}
