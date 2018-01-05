import {Action} from '@ngrx/store';
import {FOX_CONSTANTS} from './fox-constants';
import { BasicActionsModel } from '../../models/common/basicActions.model';

export class BasicActionsAction implements Action {
  type = FOX_CONSTANTS.BASIC_ACTIONS.SHOW_LOGIN;
  constructor(public payload: BasicActionsModel) {}
}

export function BasicActionsReducer(state: BasicActionsModel, action: BasicActionsAction): BasicActionsModel {
  switch (action.type) {
    case FOX_CONSTANTS.BASIC_ACTIONS.SHOW_LOGIN:
      return Object.assign({}, state, action.payload);
  }
}
