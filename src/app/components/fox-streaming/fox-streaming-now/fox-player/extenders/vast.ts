import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

declare const google: any;

@Injectable()
export class Vast {

  constructor(private http: Http) {

  }

  config(instance: any, response: any): void {
    try{
      if (!response.vastUrl) {
        return;
      }
      //response.vastUrl = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';
      //response.vastUrl = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';

      instance.ima({
        id: instance.id(),
        adTagUrl: response.vastUrl,
        locale: 'es'
      }, () => {
        const addCompleted = () => {
          if(instance.paused()) {
            instance.play();
          }
        };
        instance.ima.addEventListener(google.ima.AdEvent.Type.COMPLETE, addCompleted);
        instance.ima.addEventListener(google.ima.AdEvent.Type.SKIPPED, addCompleted);
        instance.ima.startFromReadyCallback();
      });
      instance.ima.requestAds();
    } catch (e){
      console.log("add blocked :" + e);
    }
  }
}
