import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Ng2DeviceService } from 'ng2-device-detector';
import { MobileInfoService } from 'app/services/common/mobile-info.service';

import * as AWS from 'aws-sdk';

@Injectable()
export class AWSService {
  private LOGIN_CODE = '26';
  private LOGOUT_CODE = '27';
  private PLAY_CODE = '5';
  private STOP_CODE = '22';
  private PROGRESS_CODE = '6';
  private APP_NAME = 'FOXSportsWeb';

  // aws config
  private AWS_POOL_ID = environment.AWS_POOL_ID;
  private AWS_REGION = environment.AWS_REGION;
  private AWS_STREAM = environment.AWS_STREAM;
  private AWS_API_VERSION_FIREHOSE = environment.AWS_API_VERSION_FIREHOSE;

  private AWS_FIREHOSE;
  private deviceInfo;

  constructor(
    private mobileInfoService: MobileInfoService,
    private deviceService: Ng2DeviceService) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: this.AWS_POOL_ID });
    AWS.config.region = this.AWS_REGION;
    this.AWS_FIREHOSE = new AWS.Firehose({ 
      apiVersion: this.AWS_API_VERSION_FIREHOSE, 
      httpOptions: {xhrAsync: false}
    });
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  private sendTrackingAWS(data) {
      const params = {
          DeliveryStreamName: this.AWS_STREAM,
          Record: {Data: JSON.stringify(data) + '\n'}
      };
      this.AWS_FIREHOSE.putRecord(params, (err) => {
          if (err) {
            console.log('FNG Logging : ERROR');
            console.log(err, err.stack);
            //this.byebye(err);
          } else {
            console.log('FNG Logging : OK ' + data.TrackingEventTypeExternalId);
            //this.byebye({status:'ok'});
          }
      });
  }

  public trackUserAccessLogin(user: any): void {
    const logObject = {
      'EventID': new Date().getTime().toString(),
      'TrackingEventTypeExternalId': this.LOGIN_CODE,
      'SPAccountExternalId': user.rawUser.id,
      'EventUTCDate': new Date().toISOString(),
      'Application': this.APP_NAME,
      'Country': user.rawUser.country.isoCode,
      'DeviceName': this.deviceInfo.device,
      'DeviceManufacturer': this.deviceInfo.os,
      'DeviceType': this.mobileInfoService.isMobile() ? 'Mobile' : 'Desktop',
      'BrowserName': this.deviceInfo.browser,
      'BrowserVersion': this.deviceInfo.userAgent,
      'UserStatusDescription': user.rawUser.stateID
    };

    if (user && user.rawUser && user.rawUser.id) {
      this.sendTrackingAWS(logObject);
    }
  }

  public trackUserAccessLogout(user: any): void {
    const logObject = {
      'EventID': new Date().getTime().toString(),
      'TrackingEventTypeExternalId': this.LOGOUT_CODE,
      'SPAccountExternalId': user.rawUser.id,
      'EventUTCDate': new Date().toISOString(),
      'Application': this.APP_NAME,
      'Country': user.rawUser.country.isoCode,
      'DeviceName': this.deviceInfo.device,
      'DeviceManufacturer': this.deviceInfo.os,
      'DeviceType': this.mobileInfoService.isMobile() ? 'Mobile' : 'Desktop',
      'BrowserName': this.deviceInfo.browser,
      'BrowserVersion': this.deviceInfo.os_version,
      'UserStatusDescription': user.rawUser.stateID
    };

    if (user && user.rawUser && user.rawUser.id) {
      this.sendTrackingAWS(logObject);
    }
  }

  /* Deprecated */
  /*
  public trackPlayerView(user: any, event: any): void {
    const startEvent = new Date(event.startDate * 1000);
    const duration = (new Date()).getTime() - startEvent.getTime();
    // Observable.interval(10000).takeWhile(() => true).subscribe(() => this.function());

    const logObject = {
      'EventID': new Date().getTime().toString(),
      'TrackingEventTypeExternalId': this.PROGRESS_CODE,
      'ContentExternalId': event.id,
      'ContentExternalIdSource': 'Omnix-live-event',
      'SPAccountExternalId': user.rawUser.id,
      'EventUTCDate': new Date().toISOString(),
      'Application': this.APP_NAME,
      'Country': user.rawUser.country.isoCode,
      'StartUTCDate': startEvent.toISOString(),
      'WatchedDuration': duration,
      'DeviceName': this.deviceInfo.device,
      'DeviceManufacturer': this.deviceInfo.os,
      'DeviceType': this.mobileInfoService.isMobile() ? 'Mobile' : 'Desktop',
      'BrowserName': this.deviceInfo.browser,
      'BrowserVersion': this.deviceInfo.os_version,
      'ContentAuthLevel': event.authLevel
    };
    console.log(event);
    console.log(logObject);
    // this.sendTrackingAWS(logObject);
  }
  */

  public trackPlayerPlay(user: any, event: any): void {
    let startEvent = new Date();
    const evid = event.id.split('_')[0];

    if(event.startDate){
      startEvent = new Date(event.startDate);
    }

    const logObject = {
      'EventID': new Date().getTime().toString(),
      'TrackingEventTypeExternalId': this.PLAY_CODE,
      'ContentExternalId': evid,
      'ContentExternalIdSource': 'Omnix-live-event',
      'SPAccountExternalId': user.rawUser.id,
      'EventUTCDate': new Date().toISOString(),
      'Application': this.APP_NAME,
      'Country': user.rawUser.country.isoCode,
      'StartUTCDate': startEvent.toISOString(),
      'DeviceName': this.deviceInfo.device,
      'DeviceManufacturer': this.deviceInfo.os,
      'DeviceType': this.mobileInfoService.isMobile() ? 'Mobile' : 'Desktop',
      'BrowserName': this.deviceInfo.browser,
      'BrowserVersion': this.deviceInfo.os_version,
      'ContentAuthLevel': event.authLevel,
      'UserStatusDescription': user.rawUser.stateID
    };

    if (user && user.rawUser && user.rawUser.id) {
      this.sendTrackingAWS(logObject);
    }
  }

  public trackPlayerStop(user: any, event: any, playStart: Date): void {
    let startEvent = new Date();
    const evid = event.id.split('_')[0];
    let watchedDuration = 0;

    if(event.startDate){
      startEvent = new Date(event.startDate);
    }

    if(playStart){
      watchedDuration = (new Date()).getTime() - playStart.getTime();
    }

    const logObject = {
      'EventID': new Date().getTime().toString(),
      'TrackingEventTypeExternalId': this.STOP_CODE,
      'ContentExternalId': evid,
      'ContentExternalIdSource': 'Omnix-live-event',
      'SPAccountExternalId': user.rawUser.id,
      'EventUTCDate': new Date().toISOString(),
      'Application': this.APP_NAME,
      'Country': user.rawUser.country.isoCode,
      'StartUTCDate': startEvent.toISOString(),
      'DeviceName': this.deviceInfo.device,
      'DeviceManufacturer': this.deviceInfo.os,
      'DeviceType': this.mobileInfoService.isMobile() ? 'Mobile' : 'Desktop',
      'BrowserName': this.deviceInfo.browser,
      'BrowserVersion': this.deviceInfo.os_version,
      'ContentAuthLevel': event.authLevel,
      'WatchedDuration': watchedDuration,
      'UserStatusDescription': user.rawUser.stateID
    };
    
    if (user && user.rawUser && user.rawUser.id) {
      this.sendTrackingAWS(logObject);
      //this.byebye(logObject);
    }
  }

  /*
  byebye(obj){
    console.log("Ending chat..");
    const xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8080/" +"bye?id="+ JSON.stringify(obj),false);
    xhr.send();
  }*/
}
