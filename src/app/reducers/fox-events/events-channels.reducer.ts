import { StreamEventModel } from '../../models/fox-live/stream-event.model';
import { FOX_CONSTANTS } from '../common/fox-constants';
import { Action } from '@ngrx/store';

export function eventsWithChannelsReducer(state: StreamEventModel, action: Action): StreamEventModel {
  switch (action.type) {
    case FOX_CONSTANTS.EVENTS.LOADEVENTSWITHCHANNELS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
