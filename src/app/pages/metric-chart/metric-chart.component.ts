import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MetricChart} from 'app/shared/domain/metric-chart';
import {MetricService} from 'app/shared/services/metric.service';
import {environment} from 'environments/environment.prod';
import Chart from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom'
import {Metric} from '../../shared/domain/metric';
import {AuthenticationService} from '../../shared/services/authentication.service';

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

  constructor(private metricService: MetricService, private authService: AuthenticationService) {
    Chart.register(zoomPlugin);
  }

  ngOnInit(): void {
    this.authService.appKey.subscribe(key => {
      this.metricService.getByFilter(key, this.chartInfo.metricName, this.chartInfo.clientId).subscribe(res => {
        if (res !== null) {
          const mType = res.map(m => m.type).pop();
          new Chart(this.chartRef.nativeElement, {
            // in new versions, I have to explicitly say the string here
            type: this.chartInfo.chartType === 'bar' ? 'bar' : 'line',

            data: {
              labels: res.map(m => m.timestamp),
              datasets: [{
                label: `${this.chartInfo.metricName}${mType.toString() === 'IntervalMetric' ? ' in ms' : ''}`,
                fill: this.chartInfo.fillColor !== '#000000',
                borderColor: this.chartInfo.borderColor,
                backgroundColor: this.chartInfo.fillColor,
                data: res.map(m => m.value)
              },
              ]
            },
            options: {
              plugins: {
                legend: {
                  display: true,
                },
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'x'
                  },
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'x',
                  }
                }
              },
              responsive: true,
            }
          });
          this.metrics = res;
        }
      });
    })

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
