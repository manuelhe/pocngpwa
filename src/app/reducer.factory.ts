import { AppStore } from './app.store';
import { ActionReducerMap } from '@ngrx/store';
import { articlesReducer } from './reducers/articles/articles.reducer';
import { streamConfiguration } from './reducers/fox-streaming/stream-configuration.reducer';
import { FoxUserReducer } from './reducers/fox-user/fox-user.reducer';
import { locationReducer } from './reducers/geolocation/location.reducer';
import { eventsReducer } from './reducers/fox-events/events.reducer';
import { eventsWithChannelsReducer } from './reducers/fox-events/events-channels.reducer';
import { liveEventsWithChannelsReducer } from './reducers/fox-events/live-events-channels.reducer';
import { BasicActionsReducer } from './reducers/common/basicActions.reducer';

export const reducers: ActionReducerMap<AppStore> = {
     article: articlesReducer,
     streamConfiguration: streamConfiguration,
     user: FoxUserReducer,
     location: locationReducer,
     events: eventsReducer,
     eventsWithChannels: eventsWithChannelsReducer,
     liveEventsWithChannels: liveEventsWithChannelsReducer,
     basicActions: BasicActionsReducer
};