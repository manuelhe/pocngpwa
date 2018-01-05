import { LocationModel } from '../../models/fox-location/location.model';
import { FOX_CONSTANTS } from '../common/fox-constants';
import { Action } from '@ngrx/store';

export class LocationUpdate implements Action {
  type = FOX_CONSTANTS.LOCATION.UPDATE;
  constructor(public payload: LocationModel) {}
}

export function locationReducer(state: LocationModel, action: LocationUpdate): LocationModel {
  switch (action.type) {
    case FOX_CONSTANTS.LOCATION.UPDATE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}