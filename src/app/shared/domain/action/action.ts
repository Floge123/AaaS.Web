import {ActionType} from './action-type';

export abstract class Action {
  protected constructor(
    public id: number,
    public type: ActionType,
    public detectorId: number,
    public email?: string,
    public httpAddress?: string
  ) {
  }
}
