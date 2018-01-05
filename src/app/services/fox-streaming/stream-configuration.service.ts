import { Injectable, Inject } from '@angular/core';
import { StreamConfigurationModel } from '../../models/fox-streaming/stream-configuration.model';
import { StreamEventModel } from '../../models/fox-live/stream-event.model';
import { StreamEventAuthModel } from '../../models/fox-live/stream-event-auth.model';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { Observable } from 'rxjs/Observable';
import { createAction } from '../../reducers/common/createAction';
import { FOX_CONSTANTS } from '../../reducers/common/fox-constants';
import { globals } from '../../../_constants';
import { FallbackErrorModel } from '../../models/fox-streaming/stream-errors.model';
import { GeolocationService } from '../geolocation/geolocation.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class StreamConfigurationService {

  private _document: any;
  public streamConfiguration: Observable<StreamConfigurationModel>;
  public streamEvent: StreamEventModel;
  public streamEventAuth: StreamEventAuthModel;
  public streaming: any;
  public systemErrors: any;

  constructor(
    private _store: Store<AppStore>,
    private translate: TranslateService,
    private geoLocation: GeolocationService,
    @Inject(DOCUMENT) private document
  ) {
    this._document = document;
    this.streamConfiguration = _store.select( store => store.streamConfiguration);

    const messages = [
      'concurrency_error_title',
      'concurrency_error_msg',
      'retry',
      'geoblock_error_msg',
      'generic_player_error_title',
      'should_login_title',
      'ext_event_title',
      'ext_evt_btn_text',
      'not_premium_title',
      'not_premium_text',
      'err_auth_title',
      'btn_login_text',
      'event_finished',
      'continue_event_finished',
      'see_online_channel',
      'access_denied',
      'login_error_title',
      'login_error_message',
    ];

    const buildErrorObj = (
      id: string,
      title?: string,
      message?: string,
      errorTargetMessage?: string,
      errorTarget?: string,
      specialError?: boolean,
      ready: boolean = true
    ): FallbackErrorModel => {
      return {
        id: id,
        title: title,
        message: message,
        errorTargetMessage: errorTargetMessage,
        errorTarget: errorTarget,
        specialError: specialError,
        ready: ready
      };
    };

    this.geoLocation.getLocation().subscribe((location) => {
      if (location) {
        this.translate.get(messages).subscribe((res: string) => {
          const result = Object.keys(res).map(key => res[key]);

          this.systemErrors = {
            'CONCURRENCY':
              buildErrorObj('CONCURRENCY',        result[0], result[1], result[2], 'REFRESH', true),
            'GEOBLOCK':
              buildErrorObj('GEOBLOCK',           result[3], null, null, null),
            'GENERIC':
              buildErrorObj('GENERIC',            result[4], null, result[2], 'REFRESH'),
            'EXTERNALEVENT':
              buildErrorObj('EXTERNALEVENT',      result[6], null, result[7], null),
            'USERNOTPREMIUM':
              buildErrorObj('USERNOTPREMIUM',     result[8], result[9], null, null),
            'USERSHOULDLOGIN':
              buildErrorObj('USERSHOULDLOGIN',    result[5], null, result[11], 'LOGIN', true),

            'ERRORINUSERLOGIN':
              buildErrorObj('ERRORINUSERLOGIN',   result[16], result[17], result[2], 'LOGIN', true),

            'ERRORAUTH':
              buildErrorObj('ERRORAUTH',          result[10], null, result[2], 'REFRESH'),
            'COUNTDOWN':
              buildErrorObj('COUNTDOWN',          null, null, null, 'CHANNEL', true, false),
            'AFTEREVENT':
              buildErrorObj('AFTEREVENT',         result[12], result[13], result[14], 'CHANNEL'),
            'AFTEREVENTDIGITAL':
              buildErrorObj('AFTEREVENTDIGITAL',  result[12], result[13], result[14]),
            'ACCESSDENIED':
              buildErrorObj('ACCESSDENIED',       result[15])
          };
        });
      }
    });
  }

  public loadPlayer(streamEvent: StreamEventModel, streamEventAuth: StreamEventAuthModel): void {
    this.streamEvent = streamEvent;
    this.streamEventAuth = streamEventAuth;

    let videotype = 'vod';
    if (this.streamEvent.isLive) {
      if (this.streamEvent.isChannel) {
        videotype = 'livechannel';
      } else {
        videotype = 'live';
      }
    }

    let competition = 'show';
    if (this.streamEvent.statsid.length) {
      competition = 'competencia';
    }

    const dfpObj = {
      competition: competition,
      event: this.streamEvent.title,
      eventId: this.streamEvent.id.split('_')[0],
      authLevel: this.streamEvent.authLevel,
      property: this.streamEvent.title,
      videotype: videotype,
      videoid: this.streamEvent.id,
      channel: this.streamEvent.channel_info.name
    };

    /*
    let layoutUrl = globals.player.eventLive;
    if (this.streamEvent.isChannel) {
      layoutUrl = globals.player.channelLive;
    }
    if (globals.player.disableAdvancedLayout) {
      layoutUrl = globals.player.layoutSimple;
    }
*/

    this.streaming = {
      releaseUrl: this.streamEvent.media_url,
      authToken: this.streamEventAuth.tokenResponse.token,

      event: this.streamEvent,
      authorization: this.streamEventAuth,

      error: null,
      dfp: dfpObj
    };
    this._store.dispatch(
      createAction(
        FOX_CONSTANTS.STREAM_CONFIGURATION.PRELOAD_CONFIGURATION,
        this.streaming
      )
    );
  }

  public loadError(systemError: any, event?: StreamEventModel): void {
    this.streamEvent = event;
    this.streamEventAuth = null;

    this.streaming = {
      event: this.streamEvent,
      authorization: this.streamEventAuth,
      releaseUrl: this.streamEvent ? this.streamEvent.media_url : undefined,
      error: systemError
    };

    this._store.dispatch(
      createAction(
        FOX_CONSTANTS.STREAM_CONFIGURATION.LOAD_ERROR_CONFIGURATION,
        this.streaming
      )
    );
  }

  getStreamConfiguration(): Observable<StreamConfigurationModel> {
    return this.streamConfiguration;
  }
}
