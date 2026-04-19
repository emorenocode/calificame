import { DashboardPage } from '@/app/dashboard/dashboard-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'establishments',
        loadComponent: () =>
          import('./pages/establishments/establishments-page').then((c) => c.EstablishmentsPage),
      },
      {
        path: 'surveys',
        loadComponent: () => import('./pages/surveys/surveys-page').then((c) => c.SurveysPage),
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/statistics/statistics-page').then((c) => c.StatisticsPage),
      },
    ],
  },
];
