import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Detector} from '../../shared/domain/detector/detector';
import {DetectorService} from '../../shared/services/detector.service';
import {environment} from '../../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.css']
})
export class DetectorListComponent implements OnInit {
  detectors: Detector[] = [];
  showDetails = false;

  constructor(private detectorService: DetectorService) { }

  ngOnInit(): void {
    this.detectorService.get(`${environment.appKey}`, null)
      .subscribe(res => {
        this.detectors = res;

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

  openDetails() {
    this.showDetails = true;
  }
}
