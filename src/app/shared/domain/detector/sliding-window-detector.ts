import {Detector} from './detector';
import {DetectorType} from './detector-type';
import {Action} from '../action/action';
import {AggregationOperation} from './aggregation-operation';
import {ComparisonOperation} from './comparison-operation';

export class SlidingWindowDetector extends Detector {
  constructor(
    id: number,
    executionInterval: number,
    type: DetectorType,
    appKey: string,
    telemetricName: string,
    enabled: boolean,
    action: Action,
    private aggregationOp?: AggregationOperation,
    private comparisonOp?: ComparisonOperation,
    private threshold?: number
  ) {
    super(id, executionInterval, type, appKey, telemetricName, enabled, action);
  }
}
