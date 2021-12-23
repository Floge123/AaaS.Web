import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetricChart } from 'app/shared/domain/metric-chart';
import Chart from 'chart.js';
import { environment } from 'environments/environment.prod';
import { MetricCCErrorMessages } from './metric-chart-create-error-messages';

@Component({
  selector: 'app-metric-chart-create',
  templateUrl: './metric-chart-create.component.html',
  styleUrls: ['./metric-chart-create.component.css']
})
export class MetricChartCreateComponent implements OnInit {
  myForm!: FormGroup;
  @Input() chartInfo: MetricChart;
  errors: { [key: string]: string } = {};
  editMode = true;
  editChartName: string;
  showPreview = false;

  @Output() editedEvent = new EventEmitter<{old: string, new: MetricChart}>();
  @Output() createdEvent = new EventEmitter<any>();
  @Output() cancelCreateEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.chartInfo) {
      this.chartInfo = new MetricChart();
      this.editMode = false;
    } else {
      this.editChartName = this.chartInfo.chartName;
    }

    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      chartName: [this.chartInfo.chartName,  Validators.required],
      metricName: this.chartInfo.metricName,
      clientId: this.chartInfo.clientId,
      borderColor: this.chartInfo.borderColor,
      fillColor: this.chartInfo.fillColor,
      chartType: [ this.chartInfo.chartType, Validators.required]
    })
    this.myForm.statusChanges.subscribe(() => {
      this.showPreview = false;
      this.updateErrorMessages()
    });
  }

  createPreview() {
    const info: MetricChart = this.myForm.value;
    this.chartInfo = info;

    this.showPreview = true;
  }

  cancelEdit() {
    this.cancelCreateEvent.emit();
  }

  submitForm() {
    this.chartInfo = this.myForm.value;
    if (this.editMode) {
      localStorage.removeItem(`${environment.storagePrefix}${this.editChartName}`);
      this.editedEvent.emit({old: this.editChartName, new: this.chartInfo});
    } else {
      this.createdEvent.emit(this.chartInfo);
    }
    localStorage.setItem(`${environment.storagePrefix}${this.chartInfo.chartName}`, JSON.stringify(this.chartInfo));
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of MetricCCErrorMessages) {
      const control = this.myForm.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors != null &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
