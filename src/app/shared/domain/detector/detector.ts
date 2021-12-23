import {DetectorType} from './detector-type';
import {Action} from '../action/action';
import {AggregationOperation} from './aggregation-operation';
import {ComparisonOperation} from './comparison-operation';

export abstract class Detector {
  protected constructor(
    private id: number,
    private executionInterval: number,
    private type: DetectorType,
    private appKey: string,
    private telemetricName: string,
    private enabled: boolean,
    private action: Action
  ) {
  }
}
