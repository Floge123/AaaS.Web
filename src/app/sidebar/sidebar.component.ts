import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
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
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
