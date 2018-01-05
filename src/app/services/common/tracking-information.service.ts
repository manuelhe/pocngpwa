import { Injectable, Inject } from '@angular/core';
import { globals } from '../../../_constants';
import { DOCUMENT } from '@angular/platform-browser';

declare const ga: any;
declare const analytics: any;

@Injectable()
export class TrackingInformationService {
  private _document: any;
  private segmentContext = {
    primary_business_unit: 'international',
    secondary_business_unit: 'latam',
    app_name: 'play.foxsportsla.com',
    app_platform: 'web',
    app_version: globals.appVersion
  };

  constructor(@Inject(DOCUMENT) private document) {
    this._document = document;

    if (globals.adsAndTracking.segment.enabled) {
      analytics.load(globals.adsAndTracking.segment.key);
    }
  }

  public trackSegmentEvent(action: string, properties: any) {
    if (globals.adsAndTracking.segment.enabled) {
      analytics.track(action, properties, this.segmentContext);
    }
  }

  public identifySegmentEvent(user: any, profileId: string) {
    if (globals.adsAndTracking.segment.enabled) {
      analytics.identify(user.rawUser.id,
        {
          profileId: profileId
        }, this.segmentContext);
    }
  }

  public pageSegmentEvent(pageName: string) {
    if (globals.adsAndTracking.segment.enabled) {
      analytics.page(pageName, {
        appName: globals.appName,
        appVersion: globals.appVersion
      }, this.segmentContext);
    }
  }

  public resetSegmentIdentity() {
    if (globals.adsAndTracking.segment.enabled) {
      analytics.reset();
    }
  }

  public sendGAEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  public pushDataLayer(layer: any) {
    const dataLayer = this.getDataLayer();
        dataLayer.push(layer);

    window['dataLayer'] = dataLayer;
  }

  public getDataLayer(): any {
    return window['dataLayer'] || [];
  }

  public loadGTM() {
    (function(_window, _document, _script, _layer, _id) {
      _window[_layer] = _window[_layer] || [];

      _window[_layer].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      var _firstScript = _document.getElementsByTagName(_script)[0],
          _newScript   = _document.createElement(_script),
          _dataLayer   = _layer !== 'dataLayer' ? '&l=' + _layer : '';

      _newScript.async = true;
      _newScript.src   = 'https://www.googletagmanager.com/gtm.js?id=' + _id + _dataLayer;

      _firstScript.parentNode.insertBefore(_newScript, _firstScript);
    }) (window, this._document, 'script', 'dataLayer', globals.adsAndTracking.gtm.gtmId);
  }
}
