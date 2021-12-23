import {Component, OnInit} from '@angular/core';
import {Metric} from 'app/shared/domain/metric';
import {MetricChart} from 'app/shared/domain/metric-chart';
import {DetectorService} from '../../shared/services/detector.service';
import {Detector} from '../../shared/domain/detector/detector';
import {DetectorType} from '../../shared/domain/detector/detector-type';
import {Action} from '../../shared/domain/action/action';
import {ActionType} from '../../shared/domain/action/action-type';
import {AggregationOperation} from '../../shared/domain/detector/aggregation-operation';
import {ComparisonOperation} from '../../shared/domain/detector/comparison-operation';
import {environment} from '../../../environments/environment.prod';
import {MinMaxDetector} from '../../shared/domain/detector/min-max-detector';
import {SlidingWindowDetector} from '../../shared/domain/detector/sliding-window-detector';
import {EmailAction} from '../../shared/domain/action/email-action';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  charts: MetricChart[] = [];

  createMode = false;
  detailMode = false;
  focusedChart: MetricChart;
  detailModeMetrics: Metric[];

  constructor(private dService: DetectorService) {}

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0, 11) === `${environment.storagePrefix}`) {
        this.charts.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    this.sortCharts();
  }

  deleteChartEventHandle(event: MetricChart) {
    this.deleteChart(event);
  }

  editChartEventHandle(event: MetricChart) {
    this.focusedChart = event;
    this.createMode = true;
  }

  generateCreateForm() {
    this.createMode = true;
  }

  sortCharts() {
    this.charts.sort((c1, c2) => (c1.chartName < c2.chartName ? -1 : 1));
  }

  chartCreatedEventHandle(event: MetricChart) {
    this.createMode = false;
    this.deleteChart(this.charts.filter(c => c.chartName === event.chartName).pop());
    this.charts.push(event);
    this.sortCharts();
    this.focusedChart = null;
  }

  chartEditedEventHandle(event) {
    this.createMode = false;
    this.deleteChart(this.charts.filter(c => c.chartName === event.old).pop());
    this.charts.push(event.new);
    this.sortCharts();
    this.focusedChart = null;
  }

  deleteChart(chart: MetricChart) {
    const index = this.charts.indexOf(chart, 0);
    if (index > -1) {
      this.charts.splice(index, 1);
    }
  }

  cancelCreate() {
    this.createMode = false;
    this.focusedChart = null;
  }

  switchToDetail(event) {
    this.detailMode = true;
    this.focusedChart = event.chart;
    this.detailModeMetrics = event.metrics;
  }

  closeDetail() {
    this.detailMode = false;
  }



}
