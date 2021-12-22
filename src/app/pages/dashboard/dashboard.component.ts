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

  createMode: boolean = false;
  createForm: MetricChartCreateComponent;

  constructor() {}

  ngOnInit(){
    console.log("init metric");
    for (var i = 0; i < localStorage.length; i++) {
      console.log(localStorage.key(i).substring(0,10));
      if (localStorage.key(i).substring(0,10) == "AaaS.Chart") {
        this.charts.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    //this.charts.push(new MetricChart("WordsPerMinute", null, "Words per Minute", "line", "#2930A2", "#2930A2"));
    //this.charts.push(new MetricChart("ErrorCounter", "8t4iupbz-aozrohu-vqdu9w6-1iwb8zm_5", "Misstyped words", "line", "#ce5a29", "#ce5a29"));
  }

  generateCreateForm() {
    this.createMode = true;
  }



}
