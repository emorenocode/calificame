import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':clientId',
    loadComponent: () => import('./rate/rate-page').then((c) => c.RatePage),
  },
];
