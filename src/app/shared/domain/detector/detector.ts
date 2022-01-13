import {DetectorType} from './detector-type';
import {Action} from '../action/action';
import {AggregationOperation} from './aggregation-operation';
import {ComparisonOperation} from './comparison-operation';

export abstract class Detector {
  protected constructor(
    public id: number,
    public executionInterval: Number,
    public type: DetectorType,
    public appKey: string,
    public telemetricName: string,
    public enabled: boolean,
    public action: Action
  ) {
  }
}
