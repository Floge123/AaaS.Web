import { Component, OnInit } from '@angular/core';
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
  chartInfo: MetricChart = new MetricChart();
  errors: { [key: string]: string } = {};
  showPreview: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // we are using a FormBuilder to fill the Form-Model
    this.myForm = this.fb.group({
      chartName: [this.chartInfo.chartName, Validators.required],
      metricName: this.chartInfo.metricName,
      clientId: this.chartInfo.clientId,
      borderColor: this.chartInfo.borderColor,
      fillColor: this.chartInfo.fillColor,
      chartType: this.chartInfo.chartType
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
    window.location.reload();
  }

  submitForm() {
    localStorage.setItem(`${environment.storagePrefix}${this.chartInfo.chartName}`, JSON.stringify(this.chartInfo));
    window.location.reload();
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
