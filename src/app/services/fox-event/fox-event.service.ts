import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { globals } from '_constants';

import { FoxUserModel } from '../../models/fox-user/fox-user.model';
import { FoxUserService } from '../fox-user/fox-user.service';

import { GeolocationService } from '../geolocation/geolocation.service';
import { MobileInfoService } from '../common/mobile-info.service';
import { AppStore } from '../../app.store';
import { StreamEventModel } from '../../models/fox-live/stream-event.model';
import { FOX_CONSTANTS } from 'app/reducers/common/fox-constants';
import {StreamEventModelWithChannels} from "../../models/fox-live/stream-event-channels.model";

@Injectable()
export class FoxEventService {
  private user: FoxUserModel;
  private eventsPath = '/event';
  private channelsPath = '/channel';
  private authorizationLevelApiPath = '/auth/gettoken';
  private platform: string;
  private country: string;
  private from = 0;
  private size = 300;

  private eventsStore: Observable<StreamEventModel>;
  private eventsWithChannelsStore: Observable<StreamEventModel>;
  private liveEventsWithChannelsStore: Observable<StreamEventModel>;
  private eventsWithChannels;

  constructor(
    private http: Http,
    private geolocation: GeolocationService,
    private mobileInfoService: MobileInfoService,
    private userService: FoxUserService,
    private store: Store<AppStore>
  ) {
    this.userService
    .getUser()
    .subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = undefined;
      }
    });

    this.eventsStore = store.select( str => str.events );
    this.eventsWithChannelsStore = store.select( str => str.eventsWithChannels );
    this.liveEventsWithChannelsStore = store.select( str => str.liveEventsWithChannels );
    this.loadAllEvents(0, 300);
    this.loadAllEventsWithChannels(0, 300);
    this.loadAllLiveEventsWithChannels(0, 300);
  }

  public getEventsApiPath (data: any = null): string {
    if(data.country == '--'){
      return `${this.eventsPath}?platform=${data.platform}&from=${data.from}&size=${data.size}`
    }
    return `${this.eventsPath}?platform=${data.platform}&country=${data.country}&from=${data.from}&size=${data.size}`;
  }

  public getChannelsApiPath (data: any = null): string {
    if(data.country == '--'){
      return `${this.channelsPath}`;
    }
    return `${this.channelsPath}?country=${data.country}`;
  }

  public getAuthorizationLevelApiPath(data: any = null): string {
    return `${this.authorizationLevelApiPath}`;
  }

  public getChannels(country = 'AR'): Observable<Array<any>> {
    return this.geolocation.getLocation().flatMap((location) => {
      const pathOptions: any = {
        country: location ? location.countryCode : country
      };

      const apiUrl: string = globals.getApiEndPoint('content', this.getChannelsApiPath(pathOptions));

      return this.http.get(apiUrl).map((res: Response) => {
        const channels = res.json().entries;
        channels
          .map((chnl) => {
            chnl.mediaId = this.buildMediaId(chnl.media_url);
            chnl.slug = this.slugify(chnl.id,chnl.name);
          });
        return channels;
      });
    });
  }

  public getEvent(eventId): Observable<any> {
    return this.getAllLiveEventsWithChannels(0, 300)
      .map((events) => {
        if (events) {
          events = Object.keys(events).map(key => events[key]);
          const ev = events.find((evt) => {
            if (evt.id === eventId) {
              return evt;
            }
          });
          return ev;
        }
      });
  }

  public getAll(f, s): Observable<any> {
    return this.eventsStore;
  }

  public getAllEventsWithChannels(f, s): Observable<any> {
    return this.eventsWithChannelsStore;
  }

  public getAllLiveEventsWithChannels(f, s): Observable<any> {
    return this.liveEventsWithChannelsStore;
  }

  public loadAllLiveEventsWithChannels(f, s) {
    this.getAll(0, 300).subscribe((events) => {
      if (events) {
        const location = events[0].location;
        events = Object.keys(events).map(key => events[key]);

        const eventsLive = events.filter((ev) => {
          // By default set last order
          ev.order = 100000;

          if (ev.startDate) { // Is event
            const startEvent = new Date(ev.startDate * 1000);
            const endEvent = new Date(ev.endDate * 1000);
            const timeNow = new Date();

            if (endEvent.getTime() >= timeNow.getTime()) {
              ev.isLive = true;
              return startEvent.getTime() <= timeNow.getTime() &&  timeNow.getTime() <= endEvent.getTime();
            } else {
              ev.isLive = false;
              return false;
            }
          } else { // Is Channel
            return true;
          }
        });

        this.getChannels().subscribe((channels) => {
            if (channels) {
              channels.map((channel) => {
                const eventInChannel = eventsLive.find((event, ei) => {
                  if (event.mediaId === channel.mediaId) {
                    event.order = channel.order;
                    event.isChannel = false;
                    return true;
                  }
                });

                if (!eventInChannel) {
                  eventsLive.push({
                    authLevel: channel.authLevel,
                    channel: channel.channel,
                    channel_info: {
                      display_name: channel.name || '',
                      logo_picture: channel.logo_picture,
                      media_url: channel.media_url,
                      name: channel.slug
                    },
                    startDate: null,
                    endDate: null,
                    id: channel.id,
                    image: {
                      url: '/assets/images/default-thumbnail-' + channel.name.toLowerCase().split(' ').join('-') + '.jpg'
                    },
                    isLive: true,
                    isPremium: channel.authLevel === 'premium',
                    label: 'SHOW',
                    media_url: channel.media_url,
                    mediaId: channel.mediaId,
                    statsid: '',
                    externalEvent: '',
                    title: channel.name,
                    isChannel: true,
                    location: location,
                    order: channel.order,
                    slug: this.slugify(channel.id, channel.name)
                  });
                }

              });

              eventsLive.sort((ev1, ev2) => {
                if (ev1.order < ev2.order) {
                  return -1;
                } else if (ev1.order > ev2.order) {
                  return 1;
                }
                return 0;
              });
              this.setLiveEventsWithChannels(eventsLive);
            }
          });
      }
    });
  }

  public loadAllEventsWithChannels(f, s) {
    this.getAll(0, 300).subscribe((events) => {
      if (events) {
        const location = events[0].location;

        this
        .getChannels()
        .subscribe((channels) => {

          if (channels) {
            events = Object.keys(events).map(key => events[key]);

            channels.map((channel) => {
              const eventInChannel = events.find((ev, ei) => {
                if (ev.mediaId === channel.mediaId) {
                  events[ei].isChannel = false;
                  return true;
                } else {
                  if (!channel.addedAsEvent) {
                    channel.addedAsEvent = true;
                    events.push(this.convertChannelIntoEvent(channel, location));
                  }
                }
              });
            });

            this.setEventsWithChannels(events);
          }
        });
      }
    });
  }

  private loadAllEvents(f, s) {
    let channels: Array<any>;
    let events: Array<any>;
    this.geolocation.getLocation().subscribe(
      (location) => {
        if (location) {
          const pathOptions = {
            platform: 'webapp',
            country: location.countryCode,
            from: f || this.from,
            size: s || this.size
          };

          const apiUrl: string = globals.getApiEndPoint('content', this.getEventsApiPath(pathOptions));

          this.http.get(apiUrl).subscribe((res: Response) => {
            events = res.json().entries;
            this.getChannels(pathOptions.country).subscribe((chnnls) => {
              channels = chnnls;

              events
                .map((ev) => {
                  ev.mediaId = this.buildMediaId(ev.media_url);

                  // Get channel info from channel
                  const channel_info = channels.find((channel) => {
                    return ev.mediaId === channel.mediaId;
                  });

                  // Update even channel info
                  ev.channel_info.display_name = channel_info ? channel_info.name : '';
                  ev.channel_info.logo_picture = channel_info ? channel_info.logo_picture : '';
                  ev.channel_info.media_url = channel_info ? channel_info.media_url : '';

                  // Get if is premium
                  ev.isPremium = ev.authLevel === 'premium';

                  ev.slug = this.slugify(ev.id, ev.title)

                  // Event location
                  ev.location = pathOptions.country;
                });
            });
            this.setEvents(events);
          });
        }
      });
  }

  private buildMediaId(mediaUrl: string): string {
    if (mediaUrl) {
      const media_id_expression = /[\w]*(?=\?)/i;
      return media_id_expression.exec(mediaUrl)[0];
    }
    return null;
  }

  public getByDate(events, d): Array<any> {
    return events.filter((ev) => {
      const startEvent = new Date(ev.startDate * 1000);
      const startDate = `${startEvent.getDate()}/${(startEvent.getMonth() + 1)}/${startEvent.getFullYear()}`;
      const time = d;
      const date = `${time.getDate()}/${(time.getMonth() + 1)}/${time.getFullYear()}`;

      if (startDate === date) {
        return startEvent.getTime() >= time.getTime();
      } else {
        return false;
      }
    });
  }

  public getAuthorizationLevel(user: any, ev: any): Observable<any> {
    const request = [];
    const apiUrl = globals.getApiEndPoint('auth', this.getAuthorizationLevelApiPath());

    if (ev.authLevel === 'free') {
      return this
        .http
        .get(`${apiUrl}?authLevel=free&country=${ev.location}`)
        .map((res: Response) => {
          return res.json();
        });
    }

    const reqData = {
      'urn': ev.channel,
      'authLevel': ev.authLevel,
      'country': ev.location,
      'userToken': user ? user.authToken : '',
      'userName': user ? user.id : 'Anonymous',
    };

    for (const res in reqData) {
      request.push(`${res}=${reqData[res]}`);
    }

    return this
      .http
      .get(`${apiUrl}?${request.join('&')}`)
      .map((res: Response) => {
        return res.json();
      });
  }

  public convertChannelIntoEvent(channel, location?): StreamEventModelWithChannels {
    return {
      authLevel: channel.authLevel,
      channel: channel.channel,
      channel_info: {
        display_name: channel.name || '',
        logo_picture: channel.logo_picture,
        media_url: channel.media_url,
        name: channel.slug
      },
      startDate: null,
      endDate: null,
      id: channel.id,
      image: {
        url: '/assets/images/default-thumbnail-' + channel.name.toLowerCase().split(' ').join('-') + '.jpg'
      },
      isLive: true,
      isPremium: channel.authLevel === 'premium',
      label: 'SHOW',
      media_url: channel.media_url,
      mediaId: channel.mediaId,
      statsid: '',
      externalEvent: '',
      title: channel.name,
      isChannel: true,
      location: location,
      slug: this.slugify(channel.id, channel.name)
    };
  }

  private setEvents(events: any) {
    this.store.dispatch({ type: FOX_CONSTANTS.EVENTS.LOADEVENTSONLY, payload: events });
  }

  private setEventsWithChannels(events: any) {
    this.store.dispatch({ type: FOX_CONSTANTS.EVENTS.LOADEVENTSWITHCHANNELS, payload: events });
  }

  private setLiveEventsWithChannels(events: any) {
    this.store.dispatch({ type: FOX_CONSTANTS.EVENTS.LOADLIVEEVENTSWITHCHANNELS, payload: events });
  }

  private slugify(id: string, name: string): string {
    const numericId = id.split('_')[0];
    const str = `${numericId}-${name}`;
    return str.toLowerCase().replace(/ /g, '-').replace(/([^a-zA-Z0-9\._-]+)/, '');
  }
}
