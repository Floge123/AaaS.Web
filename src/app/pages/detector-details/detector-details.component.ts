import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Detector} from '../../shared/domain/detector/detector';
import {MetricService} from '../../shared/services/metric.service';
import {environment} from '../../../environments/environment.prod';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MetricCCErrorMessages} from '../metric-chart-create/metric-chart-create-error-messages';
import {DetectorType} from '../../shared/domain/detector/detector-type';
import {ActionType} from '../../shared/domain/action/action-type';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {AggregationOperation} from '../../shared/domain/detector/aggregation-operation';
import {ComparisonOperation} from '../../shared/domain/detector/comparison-operation';
import {DurationFormatPipe} from '../../pipes/duration-format.pipe';
import {DetectorInitializer} from '../../shared/domain/detector/detector-initializer';
import {Action} from '../../shared/domain/action/action';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-detector-details',
  templateUrl: './detector-details.component.html',
  styleUrls: ['./detector-details.component.css']
})
export class DetectorDetailsComponent implements OnInit {
  @Input() detector: Detector;
  @Output() closeEventEmitter = new EventEmitter();
  @Output() editedEventEmitter = new EventEmitter<Detector>();
  @Output() createdEventEmitter = new EventEmitter<Detector>();

  myForm!: FormGroup;
  errors: { [key: string]: string } = {};
  metricNames: string[];
  editMode = true;
  detectorTypes: string[];
  actionTypes: string[];
  aggregationTypes: string[];
  comparisonTypes: string[];

  time: NgbTimeStruct;
  showMinMaxConfig = false;
  showSlidingWindowConfig = false;
  showMailActionConfig = false;
  showWebActionConfig = false;

  constructor(private fb: FormBuilder,
              private metricService: MetricService,
              private durationFormatter: DurationFormatPipe,
              private detectorInitializer: DetectorInitializer,
              private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    if (!this.detector) {
      this.detector = new Detector();
      this.detector.action = new Action();
      this.editMode = false;
    }
    this.authService.appKey.subscribe(r => {
      this.metricService.getNames(r).subscribe(res => this.metricNames = res);
    });
    this.showMinMaxConfig = this.detector.type === DetectorType.MinMaxDetector;
    this.showSlidingWindowConfig = this.detector.type === DetectorType.SlidingWindowDetector;
    this.showMailActionConfig = this.detector.action.type === ActionType.MailAction;
    this.showWebActionConfig = this.detector.action.type === ActionType.WebHookAction;
    this.initForm();
  }

  initForm() {
    this.initComboBoxes();
    this.myForm = this.fb.group({
      metricName: [this.detector.telemetricName, Validators.required],
      type: [this.detector.type, Validators.required],
      aType: [this.detector.action.type, Validators.required],
      interval: [this.durationFormatter.convertIntervalToTimeStruct(this.detector.executionInterval), Validators.required],
      enabled: this.detector.enabled,
      min: this.detector.minValue,
      max: this.detector.maxValue,
      outliers: this.detector.outlierCount,
      aggT: this.detector.aggregationOp,
      compT: this.detector.comparisonOp,
      thresh: this.detector.threshold,
      mail: this.detector.action.email,
      web: this.detector.action.httpAddress
    });

    if (this.editMode) {
      this.myForm.controls.type.disable();
    }

    this.myForm.statusChanges.subscribe(() => {
      this.updateErrorMessages()
      if (this.myForm.valid) {
        this.detectorInitializer.initialize(this.detector, this.myForm.value);
      }
    });
  }

  initComboBoxes() {
    this.detectorTypes = Object.keys(DetectorType).filter((type) => {
      return isNaN(Number(type));
    });
    this.actionTypes = Object.keys(ActionType).filter((type) => {
      return isNaN(Number(type));
    });
    this.aggregationTypes = Object.keys(AggregationOperation).filter((type) => {
      return isNaN(Number(type));
    });
    this.comparisonTypes = Object.keys(ComparisonOperation).filter((type) => {
      return isNaN(Number(type));
    });
  }

  typeSelectChange() {
    this.showMinMaxConfig = this.myForm.value.type === DetectorType.MinMaxDetector;
    this.showSlidingWindowConfig = this.myForm.value.type === DetectorType.SlidingWindowDetector;
  }

  actionTypeSelectChange() {
    this.showMailActionConfig = this.myForm.value.aType === ActionType.MailAction;
    this.showWebActionConfig = this.myForm.value.aType === ActionType.WebHookAction;
  }

  enable(e) {
    this.detector.enabled = e.enabled;
  }

  submitForm() {
    if (this.editMode) {
      this.editedEventEmitter.emit(this.detector);
    } else {
      this.detector.appKey = environment.appKey;
      this.createdEventEmitter.emit(this.detector);
    }
  }

  closeDetails() {
    this.closeEventEmitter.emit();
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
