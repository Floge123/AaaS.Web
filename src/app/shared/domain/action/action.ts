import {ActionType} from './action-type';

export class Action {
  constructor(
    public id?: number,
    public type?: ActionType,
    public detectorId?: number,
    public email?: string,
    public httpAddress?: string
  ) {
  }
}
