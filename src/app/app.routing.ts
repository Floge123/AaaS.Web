import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
import {UserComponent} from './pages/user/user.component';
import {NotificationsComponent} from './pages/notifications/notifications.component';
import {TableComponent} from './pages/table/table.component';
import {TypographyComponent} from './pages/typography/typography.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'icons',
    component: IconsComponent
  },
  {
    path: 'maps',
    component: MapsComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'typography',
    component: TypographyComponent
  }
]
