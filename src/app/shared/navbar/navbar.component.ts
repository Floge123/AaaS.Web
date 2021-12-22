import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Location} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;

    //@ViewChild("navbar-cmp", {static: false}) button;

    constructor(location:Location) {
        this.location = location;
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
