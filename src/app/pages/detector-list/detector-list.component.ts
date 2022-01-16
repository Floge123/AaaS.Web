import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Detector} from '../../shared/domain/detector/detector';
import {DetectorService} from '../../shared/services/detector.service';
import {environment} from '../../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {DxDataGridComponent} from 'devextreme-angular';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.css']
})
export class DetectorListComponent implements OnInit {
  detectors: Detector[] = [];
  showDetails = false;
  detailedDetector: Detector;

  constructor(private detectorService: DetectorService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.initDetectors();
  }

  initDetectors() {
    this.authService.appKey.subscribe(key => {
      this.detectorService.get(key, null)
        .subscribe(res => {
          this.detectors = res;
        });
    });
  }

  customizeColumns(columns) {
    columns.forEach(function(column) {
      column.cssClass = 'myClass';
    });
  }

  handleToggleEvent(event) {
    const affected = this.detectors.filter(d => d.id === event.id).pop();
    affected.enabled = event.enabled;
    this.detectorService.update(affected);
  }

  openCreate() {
    this.showDetails = true;
  }

  openDetails(event) {
    this.detailedDetector = this.detectors.filter(d => d.id === event).pop();
    this.showDetails = true;
  }

  closeDetails() {
    this.detailedDetector = null;
    this.showDetails = false;
  }

  editEventHandle(e) {
    this.detectorService.update(e);
    this.closeDetails();
  }

  createEventHandle(e) {
    this.detectorService.post(e)
      .subscribe(() => this.initDetectors());
    this.closeDetails();
  }

  deleteDetector(e) {
    this.authService.appKey.subscribe(key => {
      this.detectorService.delete(key, e)
        .subscribe(() => this.initDetectors());
    });

  }
}
