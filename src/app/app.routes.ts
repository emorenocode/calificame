import { HomePage } from '@/app/home/home-page';
import { UserService } from '@/app/shared/services/user-service';
import { inject } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login-page').then((c) => c.LoginPage),
  },
  {
    path: 'rate/:surveyId',
    loadComponent: () => import('./rate/rate-page').then((c) => c.RatePage),
  },
  {
    path: 'dashboard',
    canMatch: [
      () => {
        const user = inject(UserService).currentUser();
        return !!user;
      },
    ],
    loadChildren: () => import('./dashboard/dashboard.routes').then((r) => r.routes),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register-page').then((c) => c.RegisterPage),
  },
  {
    path: '',
    component: HomePage,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
