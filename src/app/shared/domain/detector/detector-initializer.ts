import {Injectable} from '@angular/core';
import {Detector} from './detector';
import {DurationFormatPipe} from '../../../pipes/duration-format.pipe';
import {DetectorType} from './detector-type';
import {Action} from '../action/action';
import {ActionType} from '../action/action-type';

@Injectable({
  providedIn: 'root'
})
export class DetectorInitializer {
  constructor(private durationFormatter: DurationFormatPipe) {
  }

  initialize(detector: Detector, source: any) {
    if (!detector) {
      detector = new Detector();
    }
    if (source.metricName) {
      detector.telemetricName = source.metricName;
    }
    if (source.type) {
      detector.type = source.type
    }
    detector.executionInterval = this.durationFormatter.convertTimeStructToInterval(source.interval);
    if (detector.type === DetectorType.MinMaxDetector) {
      detector.minValue = source.min;
      detector.maxValue = source.max;
      detector.outlierCount = source.outliers;
    } else if (detector.type === DetectorType.SlidingWindowDetector) {
      detector.aggregationOp = source.aggT;
      detector.comparisonOp = source.compT;
      detector.threshold = source.thresh;
    }
    if (!detector.action) {
      detector.action = new Action();
    }
    if (source.aType) {
      detector.action.type = source.aType;
    }
    if (detector.action.type === ActionType.WebHookAction) {
      detector.action.httpAddress = source.web;
    } else if (detector.action.type === ActionType.MailAction) {
      detector.action.email = source.mail;
    }
  }
}
