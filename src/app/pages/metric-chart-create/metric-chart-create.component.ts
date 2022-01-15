import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetricChart } from 'app/shared/domain/metric-chart';
import { environment } from 'environments/environment.prod';
import { MetricCCErrorMessages } from './metric-chart-create-error-messages';
import {MetricService} from '../../shared/services/metric.service';
import {ClientInstanceService} from '../../shared/services/client-instance.service';

@Component({
  selector: 'app-metric-chart-create',
  templateUrl: './metric-chart-create.component.html',
  styleUrls: ['./metric-chart-create.component.css']
})
export class MetricChartCreateComponent implements OnInit {
  myForm!: FormGroup;
  metricNames: string[] = [];
  clientInstanceIds: string[] = [];

  @Input() chartInfo: MetricChart;
  unselectString = '----';
  errors: { [key: string]: string } = {};
  editMode = true;
  editChartName: string;
  showPreview = false;

  @Output() editedEvent = new EventEmitter<{old: string, new: MetricChart}>();
  @Output() createdEvent = new EventEmitter<any>();
  @Output() cancelCreateEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private metricService: MetricService,
              private clientInstanceService: ClientInstanceService
  ) { }

  ngOnInit(): void {
    if (!this.chartInfo) {
      this.chartInfo = new MetricChart();
      this.editMode = false;
    } else {
      this.editChartName = this.chartInfo.chartName;
    }
    this.metricNames.push(this.unselectString);
    this.clientInstanceIds.push(this.unselectString);
    this.metricService.getNames(`${environment.appKey}`).subscribe(res => this.metricNames.push(...res));
    this.clientInstanceService.getAllInstances(`${environment.appKey}`).subscribe(res => this.clientInstanceIds.push(...res));
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
    console.log(this.chartInfo)
    this.myForm.statusChanges.subscribe(() => {
      if (this.myForm.value.metricName === this.unselectString) {
        this.myForm.value.metricName = undefined;
      }
      if (this.myForm.value.clientId === this.unselectString) {
        this.myForm.value.clientId = undefined;
      }
      this.showPreview = false;
      this.updateErrorMessages()
      if (this.myForm.valid) {
        this.chartInfo = this.myForm.value;
      }
    });
  }

  useBorderColor() {
    this.myForm.patchValue({fillColor: this.myForm.controls['borderColor'].value});
  }

  useFillColor() {
    this.myForm.patchValue({borderColor: this.myForm.controls['fillColor'].value});
  }

  createPreview() {
    this.showPreview = true;
  }

  cancelEdit() {
    this.cancelCreateEvent.emit();
  }

  submitForm() {
    if (!this.chartInfo.fillColor) {
      this.chartInfo.fillColor = '#000000';
    }
    if (!this.chartInfo.borderColor) {
      this.chartInfo.borderColor = '#000000';
    }
    if (this.editMode) {
      localStorage.removeItem(`${environment.storagePrefix}${this.editChartName}`);
      this.editedEvent.emit({old: this.editChartName, new: this.chartInfo});
    } else {
      const temp: MetricChart = this.myForm.value;
      if (localStorage.getItem(`${environment.storagePrefix}${temp.chartName}`)) {
        this.errors['chartName'] = 'Name already exists, has to be unique';
        return;
      }

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
