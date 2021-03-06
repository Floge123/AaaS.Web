import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Location} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;

    constructor(location: Location) {
        this.location = location;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }

    getTitle() {
      let title = this.location.prepareExternalUrl(this.location.path());
      if (title.charAt(0) === '#') {
          title = title.slice( 1 );
      }
      for (let item = 0; item < this.listTitles.length; item++) {
          if (this.listTitles[item].path === title) {
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
