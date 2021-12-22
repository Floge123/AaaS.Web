import { MetricType } from "./metric-type";

export class Metric {
    constructor(
        public id: number,
        public timestamp: Date,
        public name: string,
        public clientId: string,
        public type: MetricType,
        public value: number
    ) {}
}