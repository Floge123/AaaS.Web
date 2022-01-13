import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogsComponent } from './pages/logs/logs.component';
import { MapsComponent } from './pages/maps/maps.component';
import { DetectorListComponent } from './pages/detector-list/detector-list.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'metrics',
    pathMatch: 'full',
  },
  {
    path: 'metrics',
    component: DashboardComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'detectors',
    component: DetectorListComponent
  }
]
