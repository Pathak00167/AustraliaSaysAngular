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


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisteruserComponent },
  { path: 'otp-verification', component: OtpverificationComponent,canActivate:[RegistrationGuard], data: { stepRequired: 1 }},
  { path: 'add-username', component: AddusernameComponent,canActivate:[RegistrationGuard] , data: { stepRequired: 2 }},
  { path: 'enhance-profile', component: EnhanceprofileComponent,canActivate:[RegistrationGuard], data: { stepRequired: 3 } },
  { path: 'user-dashboard', component: UserdashboardComponent,canActivate:[userGuard] },
  {path: 'friends-request', component:FriendRequestComponent,canActivate:[userGuard]},
  {path: 'messages', component:ChatComponent,canActivate:[userGuard]},
  {path: 'chat-room/:userid', component:ChatroomComponent,canActivate:[userGuard]},
  {path: 'userProfile', component:UserprofileComponent,canActivate:[userGuard]},
  { path: '**', redirectTo: 'login' } 
];
