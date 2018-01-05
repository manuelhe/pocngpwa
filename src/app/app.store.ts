import { Article } from "./models/articles/article.model";
import { StreamConfigurationModel } from "./models/fox-streaming/stream-configuration.model";
import { FoxUserModel } from "./models/fox-user/fox-user.model";
import { LocationModel } from "./models/fox-location/location.model";
import { StreamEventModel } from "./models/fox-live/stream-event.model";
import { StreamEventModelWithChannels } from "./models/fox-live/stream-event-channels.model";
import { BasicActionsModel } from "./models/common/basicActions.model";

export interface AppStore {
  article: Article[];
  streamConfiguration: StreamConfigurationModel;
  user: FoxUserModel;
  location: LocationModel;
  events: StreamEventModel;
  eventsWithChannels: StreamEventModelWithChannels;
  liveEventsWithChannels: StreamEventModelWithChannels;
  basicActions: BasicActionsModel;
}
