import {Component, OnInit, OnDestroy, ViewChild, NgZone, ElementRef, HostListener, AfterViewInit, Renderer2} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';

import { StreamConfigurationModel } from '../../../../models/fox-streaming/stream-configuration.model';
import { StreamConfigurationService } from '../../../../services/fox-streaming/stream-configuration.service';
import { TrackingInformationService } from '../../../../services/common/tracking-information.service';
import { FoxUserService } from '../../../../services/fox-user/fox-user.service';
import { FoxUserModel } from '../../../../models/fox-user/fox-user.model';
import { AWSService } from '../../../../services/aws/aws.service';
import { FallbackErrorModel } from '../../../../models/fox-streaming/stream-errors.model';
import { FoxEventService } from '../../../../services/fox-event/fox-event.service';
import { BasicActionsService } from '../../../../services/common/basic-actions.service';

import { ExtenderFactory } from './extenders/extender-factory';
import { Subscription } from 'rxjs/Subscription';

declare const videojs: any;

@Component({
  selector: 'fox-player',
  templateUrl: './fox-player.component.html',
  styleUrls: ['./fox-player.component.scss']
})
export class FoxPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('errorPlayer') errorElem;

  @ViewChild('videoContainer')
  private videoContainer: ElementRef;

  private streamConfiguration: StreamConfigurationModel;
  private player: any;
  private playingData: any;
  private checkIsLive: boolean;
  private errorObj: FallbackErrorModel;
  private loggedUser: FoxUserModel;
  private playStart: Date;
  private days: string;
  private hours: string;
  private minutes: string;
  private seconds: string;
  private redirectUrl: string;
  private releaseUrl: string;
  private intervalCounter: any;
  private streamSubscription: Subscription;

  constructor(
    private streamConfigurationService: StreamConfigurationService,
    private userService: FoxUserService,
    private translate: TranslateService,
    private ngZone: NgZone,
    private fngAws: AWSService,
    private trackingService: TrackingInformationService,
    private eventService: FoxEventService,
    private basicServices: BasicActionsService,
    private http: Http,
    private extenderFactory: ExtenderFactory,
    private renderer: Renderer2
  ) {
    this.days = this.hours = this.minutes = this.seconds = '00';

    this.userService.getUser()
    .first(user => user != null)
    .subscribe((user) => {
      this.loggedUser = user;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.fngAws.trackPlayerStop(this.loggedUser, this.streamConfiguration.event, this.playStart);
    if (this.player) {
      this.player.dispose();
    }
  }

  ngOnInit() {
    // Used as hack to activate the lazy loading of imagaes
    const scrollVal = window.scrollY;
    window.scrollTo(0, window.scrollY + 1);
    window.scrollTo(0, scrollVal);
  }

  public setFallbackBackground() {
    try {
      return {
        'background': 'rgba(0, 0, 0, 0.6) url(' + this.streamConfiguration.event.image.url + ') 100% no-repeat',
        'backgroundSize':'cover'
      };
    } catch (e) {
      return {
        'background': 'rgb(0, 0, 0)'
      };
    }
  }

  ngOnDestroy() {
    this.streamSubscription.unsubscribe();

    if (this.player) {
      this.player.dispose();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.afterInit());
  }

  private afterInit() {
    this.streamSubscription = this.streamConfigurationService.streamConfiguration
    .subscribe((conf) => {
      if(this.player){
        this.player.dispose();
      }
      if (conf) {
        //if(!this.streamConfiguration || this.streamConfiguration.releaseUrl != conf.releaseUrl){
          this.streamConfiguration = conf;
          if(this.intervalCounter) {
            clearInterval(this.intervalCounter);
          }
          if (!this.errorHandler()) {
            this.initPlayer();
          }
       // }
      }
    });
  }

  private createPlayerContainer(){
    //<video id="videojs-test2" class="video-js vjs-default-skin fox-player-skin vjs-16-9"
    //controls preload="auto" vjs-fluid>
    const video = this.renderer.createElement('video');
    this.renderer.setAttribute(video,'id','videojs-container');
    this.renderer.setAttribute(video,'class','video-js vjs-default-skin fox-player-skin vjs-16-9');
    this.renderer.setAttribute(video,'preload','auto');
    this.renderer.setAttribute(video,'vjs-fluid','');
    this.renderer.setAttribute(video,'controls','');
    this.renderer.appendChild(this.videoContainer.nativeElement, video);
    return video;
  }

  private errorHandler(error?: FallbackErrorModel): boolean {
    this.errorObj = null;

    if ( this.streamConfiguration.error || error) {
      this.errorObj = error ? error : this.streamConfiguration.error;

      if (this.loggedUser && this.errorObj.id == 'USERNOTPREMIUM') {
         const messages = [
          'not_premium_title',
          'not_premium_text',
          'not_premium_rich_text',
          'not_premium_rich_text_name',
          'not_premium_rich_text_phone',
          'not_premium_target',
          'not_premium_target_message'
        ];

        if (this.loggedUser.rawUser.cableProvider) {

          this.translate.get(messages).subscribe((res: string) => {
            const messages = Object.keys(res).map(key => res[key]);

            if (
              this.loggedUser.rawUser.cableProvider.description
              && this.loggedUser.rawUser.cableProvider.description != ""
              && this.loggedUser.rawUser.cableProvider.phone
              && this.loggedUser.rawUser.cableProvider.phone != ""
            ) {
              this.errorObj.message = messages[2]
                .replace("{{cable_oparator_name}}", this.loggedUser.rawUser.cableProvider.description)
                .replace("{{cable_oparator_phone}}", this.loggedUser.rawUser.cableProvider.phone);
            } else if (
              this.loggedUser.rawUser.cableProvider.description
              && this.loggedUser.rawUser.cableProvider.description != ""
            ) {
              this.errorObj.message = messages[3]
                .replace("{{cable_oparator_name}}", this.loggedUser.rawUser.cableProvider.description);
            } else {
              this.errorObj.message = messages[4]
                .replace("{{cable_oparator_phone}}", this.loggedUser.rawUser.cableProvider.phone);
            }

            if (
              this.loggedUser.rawUser.cableProvider.upgrade_url
              && this.loggedUser.rawUser.cableProvider.upgrade_url != ""
            ) {
              this.errorObj.errorTarget = 'REDIRECT';
              this.errorObj.errorTargetMessage = messages[6];
              this.errorObj.specialError = true;

              this.redirectUrl = this.loggedUser.rawUser.cableProvider.upgrade_url;
            }
          });
        }
      }

      let dataLayerItem;

      switch (this.errorObj.id) {
        case this.streamConfigurationService.systemErrors.USERSHOULDLOGIN.id:
          dataLayerItem = {'event': 'loginRequired'};
          break;
        case this.streamConfigurationService.systemErrors.USERNOTPREMIUM.id:
          dataLayerItem = {'event': 'premiumRequired'};
          break;
        case this.streamConfigurationService.systemErrors.EXTERNALEVENT.id:
          dataLayerItem = {'event': 'externalContent'};
          break;
        case this.streamConfigurationService.systemErrors.CONCURRENCY.id:
          dataLayerItem = {'event': 'multipleDeviceWarning'};
          break;
        case this.streamConfigurationService.systemErrors.COUNTDOWN.id:
          dataLayerItem = {'event': 'countdownTimer'};

          const evDate = new Date(this.streamConfiguration.event.startDate * 1000);
          const doubleDigits = (number) => {
            return (number < 10 ? '0' : '') + number;
          };


          this.intervalCounter = setInterval(() => {
            const now = new Date();
            let delta = Math.abs(evDate.getTime() - now.getTime()) / 1000;

            const days = Math.floor(delta / 86400);
            this.days = doubleDigits(days);
            delta -= days * 86400;
            const hours = Math.floor(delta / 3600) % 24;
            this.hours = doubleDigits(hours);
            delta -= hours * 3600;
            const minutes = Math.floor(delta / 60) % 60;
            this.minutes = doubleDigits(minutes);
            delta -= minutes * 60;
            this.seconds = doubleDigits(Math.floor(delta));

            if (
              hours < 1
              && !this.loggedUser.loggedin
              && !this.loggedUser.loading
            ) {
              clearInterval(this.intervalCounter);
              this.intervalCounter = null;
              this.streamConfigurationService.loadError(this.streamConfigurationService.systemErrors.USERSHOULDLOGIN, this.streamConfiguration.event);
              this.errorObj = this.streamConfiguration.error;
            } else {

              if (this.errorObj) {
                this.errorObj.ready = true;
              }

              if (
                days === 0
                && hours === 0
                && minutes === 0
                && Math.floor(delta) < 5
              ) {
                window.location.reload();
              }
            }
          }, 1000);

          break;
      }

      if (dataLayerItem) {
        this.trackingService.pushDataLayer(dataLayerItem);
      }

      return true;
    }
    return;
  }

  private initPlayer(): void {
    if (this.streamConfiguration) {
      const opts = { language: 'es' };

      this.player = videojs(this.createPlayerContainer(), opts);
      this.player.addChild('CustomGradient');
      this.extenderFactory.config(this.player, this.streamConfiguration, this.loggedUser.rawUser).subscribe((res) => {
        this.player.src({
          src: res.videoUrl,
          type: 'application/x-mpegURL',
          withCredentials: true
        });

        this.playStart = new Date();

        // FNG TRACKING
        this.fngAws.trackPlayerPlay(this.loggedUser, this.streamConfiguration.event);
        this.player.play();
      }, (data) => {
        console.log(data);
        if (data.error.exception === 'ConcurrencyLimitViolationClientId' ||
          data.error.exception === 'ConcurrencyLimitViolation' ||
          data.error.exception === 'ConcurrencyLimitViolationAuth') {
          this.errorHandler(this.streamConfigurationService.systemErrors.CONCURRENCY);
        } else if (data.error.exception === 'GeoLocationBlocked') {
          this.errorHandler(this.streamConfigurationService.systemErrors.GEOBLOCK);
        } else {
          this.errorHandler(this.streamConfigurationService.systemErrors.GENERIC);
        }
      });
    }
  }

  public fallbackButtonClick(target?: string) {
    switch (target) {
      case 'LOGIN':
        this.showLogin();
        break;
      case 'CHANNEL':
        this.viewOnlineChannel();
        break;
      case 'REFRESH':
        this.refreshPlayer();
        break;
      case 'REDIRECT':
        window.open(this.redirectUrl, '_blank');
        break;
      default:
        window.location.reload();
        break;
    }
  }

  private showLogin() {
    this.basicServices.showLoginModal();
  }

  private refreshPlayer() {
    const dataLayerItem = {
      'event': 'ctaPromptVideo',
      'message': 'multipleDeviceWarning'
    };
    this.trackingService.pushDataLayer(dataLayerItem);

    window.location.reload();
  }

  private viewOnlineChannel(): void {
    this.eventService.getChannels()
    .first(channels => channels != null)
    .subscribe((channels) => {
      if (channels) {
          channels = Object.keys(channels).map(key => channels[key]);
          const chnl = channels.find((ch, chi) => {
            if (this.streamConfiguration.event.channel === ch.channel) {
              return true;
            }
          });
          if (chnl) {
            //console.log(chnl);
            this.basicServices.playEvent(chnl);
          }
      }
    });

  }
}
