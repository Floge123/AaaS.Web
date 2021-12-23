import {ActionType} from './action-type';

export abstract class Action {
  protected constructor(
    private id: number,
    private type: ActionType,
    private detectorId: number
  ) {
  }
}
