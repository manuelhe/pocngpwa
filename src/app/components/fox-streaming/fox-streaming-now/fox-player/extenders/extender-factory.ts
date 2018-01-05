import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GeolocationService } from '../../../../../services/geolocation/geolocation.service';
import { globals } from '../../../../../../_constants';
import { Premium } from './premium';
import { Regular } from './regular';
import { Vast } from './vast';
import { youbora } from './youbora';

@Injectable()
export class ExtenderFactory {

  constructor(private premium: Premium, private regular: Regular, private vast: Vast, private geoLocation: GeolocationService) {

  }

  config(instance: any, configuration: any, user: any): Observable<any> {
    youbora.attach(instance, configuration.event, user);
    const observable = this.geoLocation.getLocation().flatMap((location) => {
      const country = location.countryCode.toLowerCase();
      if (globals.player.extenders.premium.countriesExcluded.indexOf(country) < 0  && configuration.event.isPremium) {
        return this.premium.config(instance, configuration);
      } else {
        return this.regular.config(instance, configuration);
      }
    });

    return observable
      .map(res => {
        this.vast.config(instance, res);
        return res;
      });
  }
}
