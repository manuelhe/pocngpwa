import {StreamConfigurationModel} from '../../models/fox-streaming/stream-configuration.model';
import {FOX_CONSTANTS} from '../common/fox-constants';
import {Action} from '@ngrx/store';

export function streamConfiguration(state: StreamConfigurationModel, action: Action): StreamConfigurationModel {
  switch (action.type) {
    case FOX_CONSTANTS.STREAM_CONFIGURATION.PRELOAD_CONFIGURATION:
      return Object.assign({}, state, action.payload);
    case FOX_CONSTANTS.STREAM_CONFIGURATION.LOAD_ERROR_CONFIGURATION:
      return Object.assign({}, state, action.payload);
    case FOX_CONSTANTS.STREAM_CONFIGURATION.SET_STREAMING_EVENT:
      return Object.assign({}, state, action.payload);
    case FOX_CONSTANTS.STREAM_CONFIGURATION.SET_EVENT_AUTH:
      return Object.assign({}, state, action.payload);
    case FOX_CONSTANTS.STREAM_CONFIGURATION.ALLOW_FULL_SCREEN:
      return Object.assign({}, state, { allowFullScreen: action.payload});
    default:
      return state;
  }
}
