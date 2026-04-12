import { DashboardPage } from '@/app/dashboard/dashboard-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'establishments',
        loadComponent: () => import('./pages/stores/stores-page').then((c) => c.StoresPage),
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/statistics/statistics-page').then((c) => c.StatisticsPage),
      },
    ],
  },
];
