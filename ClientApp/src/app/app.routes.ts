import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
