import {Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { MetricChart } from 'app/shared/domain/metric-chart';
import { MetricService } from 'app/shared/services/metric.service';
import { environment } from 'environments/environment.prod';
import Chart from 'chart.js';
import {Metric} from '../../shared/domain/metric';

@Component({
  selector: 'app-metric-chart',
  templateUrl: './metric-chart.component.html',
  styleUrls: ['./metric-chart.component.css']
})
export class MetricChartComponent implements OnInit {
  @Input() chartInfo: MetricChart;
  @Input() showButtons: boolean;

  @Output() deleteChartEvent = new EventEmitter<MetricChart>();
  @Output() openDetailsEvent = new EventEmitter<any>();
  @Output() editChartEvent = new EventEmitter<MetricChart>();

  private metrics: Metric[] = [];

  @ViewChild('chart')
  private chartRef: ElementRef;

  constructor(private metricService: MetricService) { }

  ngOnInit(): void {
    this.metricService.getByFilter(`${environment.appKey}`, this.chartInfo.metricName, this.chartInfo.clientId).subscribe(res => {
      new Chart(this.chartRef.nativeElement, {
        type: this.chartInfo.chartType,

        data: {
          labels: res.map(m => m.timestamp),
          datasets: [{
              borderColor: this.chartInfo.borderColor,
              backgroundColor: this.chartInfo.fillColor,
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: res.map(m => m.value)
            },
          ]
        },
        options: {
          drawBorder: true,
          responsive: true,
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            y: [{
              ticks: {
                fontColor: '#9f9f9f',
                beginAtZero: false,
                maxTicksLimit: 5,
              },
              grid: {
                display: true,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: '#ccc',
                color: 'rgb(255,255,255)'
              }

            }],

            x: [{
              barPercentage: 1.6,
              grid: {
                display: true,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
              },
              gridLines: {
                drawBorder: true,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'gray',
                display: true,
              },
              ticks: {
                padding: 20,
                fontColor: '#9f9f9f'
              }
            }]
          },
        }
      });
      this.metrics = res;
    });
  }

  openDetails() {
    this.openDetailsEvent.emit({chart: this.chartInfo, metrics: this.metrics});
  }

  deleteChart() {
    this.deleteChartEvent.emit(this.chartInfo);
    localStorage.removeItem(`${environment.storagePrefix}${this.chartInfo.chartName}`);
  }

  editChart() {
    this.editChartEvent.emit(this.chartInfo);
  }
}
