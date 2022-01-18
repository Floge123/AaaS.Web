import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/home',     title: 'Home',           icon: 'nc-globe',       class: '' },
    { path: '/metrics',     title: 'Metrics',           icon: 'nc-chart-pie-36',       class: '' },
    { path: '/logs',         title: 'Logs',              icon: 'nc-single-copy-04',    class: '' },
    { path: '/detectors',          title: 'Detectors',         icon: 'nc-zoom-split',      class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  loggedIn: boolean;

  constructor(private authService: AuthenticationService) {  }

  ngOnInit() {
    this.authService.loggedIn.subscribe(r => {
      this.loggedIn = r;
      if (this.loggedIn) {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      }
    });
  }

  login() {
    if (this.authService.login()) {
      location.reload();
    }
  }

  logout() {
    this.authService.logout();
  }
}
