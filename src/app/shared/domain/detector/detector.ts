import {DetectorType} from './detector-type';
import {Action} from '../action/action';
import {AggregationOperation} from './aggregation-operation';
import {ComparisonOperation} from './comparison-operation';

export class Detector {
  constructor(
    public id?: number,
    public executionInterval?: number,
    public type?: DetectorType,
    public appKey?: string,
    public telemetricName?: string,
    public enabled?: boolean,
    public action?: Action,
    public minValue?: number,
    public maxValue?: number,
    public outlierCount?: number,
    public aggregationOp?: AggregationOperation,
    public comparisonOp?: ComparisonOperation,
    public threshold?: number
  ) {
  }
}
