import {Action} from './action';
import {ActionType} from './action-type';

export class WebAction extends Action {
  constructor(
    id: number,
    type: ActionType,
    detectorId: number,
    private httpAddress?: string
  ) {
    super(id, type, detectorId);
  }
}
