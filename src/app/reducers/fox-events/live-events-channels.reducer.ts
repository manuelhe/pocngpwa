import { FOX_CONSTANTS } from '../common/fox-constants';
import { Action } from '@ngrx/store';
import { StreamEventModelWithChannels } from '../../models/fox-live/stream-event-channels.model';

export class LiveEventsLoad implements Action {
  type = FOX_CONSTANTS.EVENTS.LOADLIVEEVENTSWITHCHANNELS;
  constructor(public payload: StreamEventModelWithChannels) {}
}

export function liveEventsWithChannelsReducer(state: StreamEventModelWithChannels, action: LiveEventsLoad): StreamEventModelWithChannels {
  switch (action.type) {
    case FOX_CONSTANTS.EVENTS.LOADLIVEEVENTSWITHCHANNELS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
