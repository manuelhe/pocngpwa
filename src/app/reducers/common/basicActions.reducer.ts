import {Action} from '@ngrx/store';
import {FOX_CONSTANTS} from './fox-constants';

import { BasicActionsModel } from '../../models/common/basicActions.model';

export function BasicActionsReducer(state: BasicActionsModel, action: Action): BasicActionsModel {
  switch (action.type) {
    case FOX_CONSTANTS.BASIC_ACTIONS.SHOW_LOGIN:
      return Object.assign({}, state, action.payload);
  }
}
