import {Action} from './action';
import {ActionType} from './action-type';

export class EmailAction extends Action {
  constructor(
    id: number,
    type: ActionType,
    detectorId: number,
    private email?: string
  ) {
    super(id, type, detectorId);
  }
}
