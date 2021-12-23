import { Component, OnInit } from '@angular/core';
import { Metric } from 'app/shared/domain/metric';
import { MetricChart } from 'app/shared/domain/metric-chart';
import { MetricService } from 'app/shared/services/metric.service';
import Chart from 'chart.js';
import { environment } from 'environments/environment.prod';
import { MetricChartCreateComponent } from '../metric-chart-create/metric-chart-create.component';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  charts: MetricChart[] = [];

  createMode = false;
  createForm: MetricChartCreateComponent;

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0, 10) === 'AaaS.Chart') {
        this.charts.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    this.sortCharts();
  }

  generateCreateForm() {
    this.createMode = true;
  }

  sortCharts() {
    this.charts.sort((c1, c2) => (c1.chartName < c2.chartName ? -1 : 1));
  }

  chartCreatedEventHandle(event: MetricChart) {
    this.createMode = false;
    this.charts.push(event);
    this.sortCharts();
  }

  cancelCreate() {
    this.createMode = false;
  }



}
