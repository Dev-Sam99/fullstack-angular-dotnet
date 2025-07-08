import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';
import { AdminLogin } from './components/admin-login/admin-login';
import { PostDetailComponent } from './components/post-detail/post-detail';
import { PostFormComponent } from './components/post-form/post-form';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
 { path: '', component: HomeComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'login', component: AdminLogin },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'create', component: PostFormComponent },
      { path: 'edit/:id', component: PostFormComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
