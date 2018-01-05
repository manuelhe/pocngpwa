import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FoxLoginModalComponent } from './components/commons/fox-modal/fox-login-modal/fox-login-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { BasicActionsService } from './services/common/basic-actions.service';
import { globals } from '../_constants';
import { environment } from '../environments/environment';
import { TrackingInformationService } from './services/common/tracking-information.service';
import { FoxUserService } from './services/fox-user/fox-user.service';
import { Meta, Title } from '@angular/platform-browser';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
  <fox-header></fox-header>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  @ViewChild(FoxLoginModalComponent) public loginModal: FoxLoginModalComponent;

  constructor(
    private translate: TranslateService,
    private geoLocation: GeolocationService,
    private basicActionsService: BasicActionsService,
    private trackingService: TrackingInformationService,
    private router: Router
  ) {
    console.log(globals.appName +  ' : ' + globals.appVersion );

    if (globals.adsAndTracking.newRelic) {
      // NREUM.info = {
      //   beacon: environment.adsAndTracking.newRelic.beacon, 
      //   errorBeacon: environment.adsAndTracking.newRelic.errorBeacon,
      //   licenseKey: environment.adsAndTracking.newRelic.licenseKey,
      //   applicationID: environment.adsAndTracking.newRelic.applicationID,
      //   sa: environment.adsAndTracking.newRelic.sa
      // };
    }

    // Load Google Tag Manager
    this.trackingService.loadGTM();

    this.geoLocation.getLocation().subscribe( (location) => {
      if (location) {
        translate.use(location.lang);
        // Esto se hace por que hay un bug en la librería de i18n,
        // el default se maneja dentro de GeolocationService
        translate.setDefaultLang(location.lang);
      }
    });

    this.basicActionsService.modalSubscriber().subscribe( (response) => {
      if (response && response.showLogin) {
          this.showLogin(response.target);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0);
      }
    });
  }

  showLogin(target?: string) {
    this.loginModal.open(target);
  }
}
