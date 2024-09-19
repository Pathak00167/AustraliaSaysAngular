import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';  // Assuming login is in auth folder
import { DashboardComponent } from './pages/dashboard/dashboard.component';  // Assuming dashboard is in dashboard folder
import { UserslistComponent } from './pages/userslist/userslist.component';
import { adminGuard } from './admin.guard'; 
import { CategoriesComponent } from './pages/categories/categories.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root to login
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[adminGuard] }, 
  { path: 'userslist', component: UserslistComponent,canActivate:[adminGuard] },
  { path: 'categorieslist', component: CategoriesComponent,canActivate:[adminGuard] },
  { path: '**', redirectTo: 'login' } 
];
