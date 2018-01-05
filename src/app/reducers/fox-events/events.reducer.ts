import { StreamEventModel } from '../../models/fox-live/stream-event.model';
import { FOX_CONSTANTS } from '../common/fox-constants';
import { Action } from '@ngrx/store';

export class EventsLoad implements Action {
  type = FOX_CONSTANTS.EVENTS.LOADEVENTSONLY;
  constructor(public payload: StreamEventModel) {}
}

export function eventsReducer(state: StreamEventModel, action: EventsLoad): StreamEventModel {
  switch (action.type) {
    case FOX_CONSTANTS.EVENTS.LOADEVENTSONLY:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
