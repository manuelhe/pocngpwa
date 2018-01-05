import { FOX_CONSTANTS } from '../common/fox-constants';
import { Action } from '@ngrx/store';
import { StreamEventModelWithChannels } from '../../models/fox-live/stream-event-channels.model';

export class EventsWithChannelLoad implements Action {
  type = FOX_CONSTANTS.EVENTS.LOADEVENTSWITHCHANNELS;
  constructor(public payload: StreamEventModelWithChannels) {}
}

export function eventsWithChannelsReducer(state: StreamEventModelWithChannels, action: EventsWithChannelLoad): StreamEventModelWithChannels {
  switch (action.type) {
    case FOX_CONSTANTS.EVENTS.LOADEVENTSWITHCHANNELS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
