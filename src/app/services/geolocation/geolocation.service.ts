import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { globals } from '_constants';
import { AppStore } from '../../app.store';
import { LocationModel } from 'app/models/fox-location/location.model';
import { FOX_CONSTANTS } from 'app/reducers/common/fox-constants';

@Injectable()
export class GeolocationService {
  locationStore: Observable<LocationModel>;

  constructor(
    private http: Http,
    private store: Store<AppStore>) {
    this.locationStore = store.select( str => str.location );
    this.detectLocation();
  }

  public getDefaultLang(): string {
    return FOX_CONSTANTS.COUNTRY_LANG_DEFAULT.lang;
  }

  private getLanguage( countryCode: string ): string {
    const codeLangArr = FOX_CONSTANTS.COUNTRY_LANG.filter(
      countryLang =>
      countryLang.country.toUpperCase() === countryCode.toUpperCase());
    if (codeLangArr && codeLangArr[0]) {
      return codeLangArr[0].lang;
    } else {
      console.log('Language for : ' + countryCode + ' not found, falling back to default lang ' + this.getDefaultLang());
      return this.getDefaultLang();
    }
  }

  public getLocation(): Observable<LocationModel> {
    return this.locationStore;
  }

  detectLocation() {
    // const apiUrl: string = globals.locationApi;
    const apiUrl: string = globals.getLocationApi();

    this
     .http
     .get(apiUrl)
     .map((res: Response) => {
       return res.json();
     })
    .subscribe(
      rawLocation => this.setLocation(rawLocation),
      error => console.log(error)
    );
  }

  setLocation(rawLocation: any) {
    // rawLocation['country-code']='UY';
    const location: LocationModel = {
            'countryCode': rawLocation['country-code'],
            'userIp': rawLocation['user-ip'],
            'lang': this.getLanguage(rawLocation['country-code'])
    };

    this.store.dispatch({ type: FOX_CONSTANTS.LOCATION.UPDATE, payload: location });
  }
}
