import { FOX_CONSTANTS } from "../reducers/common/fox-constants";
import { Action } from '@ngrx/store';
import { StreamConfigurationModel } from "../models/fox-streaming/stream-configuration.model";

export class StreamConfigurationPreload implements Action {
  type = FOX_CONSTANTS.STREAM_CONFIGURATION.PRELOAD_CONFIGURATION;
  constructor(public payload: StreamConfigurationModel) {}
}
export class StreamConfigurationLoadError implements Action {
  type = FOX_CONSTANTS.STREAM_CONFIGURATION.LOAD_ERROR_CONFIGURATION;
  constructor(public payload: StreamConfigurationModel) {}
}
export class StreamConfigurationSetStreaming implements Action {
  type = FOX_CONSTANTS.STREAM_CONFIGURATION.SET_STREAMING_EVENT;
  constructor(public payload: StreamConfigurationModel) {}
}
export class StreamConfigurationSetEvent implements Action {
  type = FOX_CONSTANTS.STREAM_CONFIGURATION.SET_EVENT_AUTH;
  constructor(public payload: StreamConfigurationModel) {}
}

export class StreamConfigurationFullScreen implements Action {
  type = FOX_CONSTANTS.STREAM_CONFIGURATION.ALLOW_FULL_SCREEN;
  constructor(public payload: StreamConfigurationModel) {}
}

export type StreamConfigurationActions = StreamConfigurationPreload | StreamConfigurationLoadError | StreamConfigurationSetStreaming | StreamConfigurationSetEvent | StreamConfigurationFullScreen
