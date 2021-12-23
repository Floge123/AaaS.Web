import {Detector} from './detector';
import {DetectorType} from './detector-type';
import {Action} from '../action/action';

export class MinMaxDetector extends Detector {
  constructor(
    id: number,
    executionInterval: number,
    type: DetectorType,
    appKey: string,
    telemetricName: string,
    enabled: boolean,
    action: Action,
    private minValue?: number,
    private maxValue?: number,
    private outlierCount?: number,
  ) {
    super(id, executionInterval, type, appKey, telemetricName, enabled, action);
  }
}
