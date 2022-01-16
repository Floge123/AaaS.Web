import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogsComponent } from './pages/logs/logs.component';
import { DetectorListComponent } from './pages/detector-list/detector-list.component';
import { CanNavigateToAdminGuard} from './can-navigate-to-admin.guard';
import { HasValidAppKeyGuard} from './has-valid-appkey.guard';
import { HomeComponent} from './pages/home/home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'metrics',
    component: DashboardComponent,
    canActivate: [CanNavigateToAdminGuard, HasValidAppKeyGuard]
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [CanNavigateToAdminGuard, HasValidAppKeyGuard]
  },
  {
    path: 'detectors',
    component: DetectorListComponent,
    canActivate: [CanNavigateToAdminGuard, HasValidAppKeyGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'index.html',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'id_token',
    pathMatch: 'full',
    redirectTo: 'home'
  }
]
