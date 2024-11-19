import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 
import { DashboardComponent } from './pages/dashboard/dashboard.component';  
import { UserslistComponent } from './pages/userslist/userslist.component';
import { adminGuard } from './admin.guard'; 
import { RegistrationGuard } from './Guards/registration.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { RegisteruserComponent } from './userauthmanagement/registeruser/registeruser.component';
import { OtpverificationComponent } from './userauthmanagement/otpverification/otpverification.component';
import { AddusernameComponent } from './userauthmanagement/addusername/addusername.component';
import { EnhanceprofileComponent } from './userauthmanagement/enhanceprofile/enhanceprofile.component';
import { userGuard } from './Guards/user.guard';
import { UserdashboardComponent } from './userauthmanagement/userdashboard/userdashboard.component';
import { FriendRequestComponent } from './userauthmanagement/friendsrequest/friendsrequest.component';
import { ChatComponent } from './userauthmanagement/chat/chat.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[adminGuard] }, 
  { path: 'userslist', component: UserslistComponent,canActivate:[adminGuard] },
  { path: 'categorieslist', component: CategoriesComponent,canActivate:[adminGuard] },
  {path: 'articles', component:ArticlesComponent,canActivate:[adminGuard]},
  { path: 'register-step-1', component: RegisteruserComponent },
  { path: 'otp-verification', component: OtpverificationComponent,canActivate:[RegistrationGuard], data: { stepRequired: 1 }},
  { path: 'add-username', component: AddusernameComponent,canActivate:[RegistrationGuard] , data: { stepRequired: 2 }},
  { path: 'enhance-profile', component: EnhanceprofileComponent,canActivate:[RegistrationGuard], data: { stepRequired: 3 } },
  { path: 'user-dashboard', component: UserdashboardComponent,canActivate:[userGuard] },
  {path: 'friends-request', component:FriendRequestComponent,canActivate:[userGuard]},
  {path: 'messages', component:ChatComponent,canActivate:[userGuard]},
  { path: '**', redirectTo: 'login' } 
];
