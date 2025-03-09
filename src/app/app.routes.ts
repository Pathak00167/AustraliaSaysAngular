import { Routes } from '@angular/router';
import { LoginComponent } from './userauthmanagement/login/login.component';
import { RegistrationGuard } from './Guards/registration.guard';
import { RegisteruserComponent } from './userauthmanagement/registeruser/registeruser.component';
import { OtpverificationComponent } from './userauthmanagement/otpverification/otpverification.component';
import { AddusernameComponent } from './userauthmanagement/addusername/addusername.component';
import { EnhanceprofileComponent } from './userauthmanagement/enhanceprofile/enhanceprofile.component';
import { userGuard } from './Guards/user.guard';
import { UserdashboardComponent } from './userauthmanagement/userdashboard/userdashboard.component';
import { FriendRequestComponent } from './userauthmanagement/friendsrequest/friendsrequest.component';
import { ChatComponent } from './userauthmanagement/chat/chat.component';
import { ChatroomComponent } from './userauthmanagement/chatroom/chatroom.component';
import { UserprofileComponent } from './userauthmanagement/userprofile/userprofile.component';
import { DashboardlayoutComponent } from './userauthmanagement/dashboardlayout/dashboardlayout.component';


export const routes: Routes = [
  // Redirect to login as the default path
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisteruserComponent },

  // Registration flow with guards
  { 
    path: 'otp-verification', 
    component: OtpverificationComponent,
    canActivate: [RegistrationGuard], 
    data: { stepRequired: 1 } 
  },
  { 
    path: 'add-username', 
    component: AddusernameComponent,
    canActivate: [RegistrationGuard],
    data: { stepRequired: 2 } 
  },
  { 
    path: 'enhance-profile', 
    component: EnhanceprofileComponent,
    canActivate: [RegistrationGuard],
    data: { stepRequired: 3 } 
  },

  // Dashboard routes with sidenav, header, and footer
  { 
    path: '', 
    component: DashboardlayoutComponent, 
    canActivate: [userGuard],  // Protect the dashboard routes
    children: [
      { path: 'user-dashboard', component: UserdashboardComponent },
      { path: 'friends-request', component: FriendRequestComponent },
      { path: 'messages', component: ChatComponent },
      { path: 'chat-room/:userid', component: ChatroomComponent },
      { path: 'userProfile', component: UserprofileComponent }
    ]
  },

  // Catch-all route (handles invalid paths)
  { path: '**', redirectTo: 'login' }
];

