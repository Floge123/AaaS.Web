import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MetricChart} from '../../shared/domain/metric-chart';
import {Metric} from '../../shared/domain/metric';
import {MetricType} from '../../shared/domain/metric-type';

@Component({
  selector: 'app-metric-details',
  templateUrl: './metric-details.component.html',
  styleUrls: ['./metric-details.component.css']
})
export class MetricDetailsComponent implements OnInit {
  @Input() chartInfo: MetricChart;
  @Input() metrics: Metric[];

  @Output() closeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeDetails() {
    this.closeEvent.emit();
  }



}
