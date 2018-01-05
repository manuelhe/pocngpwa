import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { FOX_CONSTANTS } from '../../reducers/common/fox-constants';
import { BasicActionsModel } from '../../models/common/basicActions.model';
import { TrackingInformationService } from '../common/tracking-information.service';
import { Router } from '@angular/router';
import { MobileInfoService } from './mobile-info.service';
import { Http } from '@angular/http';

import { globals } from '../../../_constants';

@Injectable()
export class BasicActionsService {

  private basicActions: Observable<BasicActionsModel>;

  constructor(
    private store: Store<AppStore>,
    private trackingService: TrackingInformationService,
    private router: Router,
    private mobileInfoService: MobileInfoService,
    private http: Http
  ) {
    this.basicActions = store.select((str) => str.basicActions);
  }

  public modalSubscriber(): Observable<BasicActionsModel> {
    return this.basicActions;
  }

  public showLoginModal(targetUrl?: string) {
    this.trackingService.pushDataLayer({
      'event': 'trackEvent',
      'eventCategory': 'login',
      'eventAction': 'start',
      'eventLabel': 'header'
    });

    this.store.dispatch({type: FOX_CONSTANTS.BASIC_ACTIONS.SHOW_LOGIN, payload: {showLogin: true, target: targetUrl}});
  }

  public playEvent(event: any): void {
    if (this.mobileInfoService.isMobile()) {
      this.router.navigate(['/mobile-app', event.slug]);
    } else {
      if (event.statsid) {
        this.http
          .get(`${globals.hostedSolutions.matchInformationUrl}?match-code=${event.statsid}`)
          .map(res => res.json())
          .subscribe(res => {
            this.router.navigate([`/vivo/${res.competition['competition-ad-name']}/${event.slug}`]);
          });
        return;
      }
      this.router.navigate(['/vivo/' + event.slug]);
    }
  }

  public static queryParams(): Observable<any> {
    // create observable
    let urlParams = new Observable<any>((observer) => {
        const paramsRGx = /([\w\-\_\.]*=[\w\-\_\.\%\1\/]*)/gi;
        const params = window.document.location.href.match(paramsRGx);
        let paramsObj: any = {};

        if (params) {
          params.map(p => {
            let param: string[] = p.split('=');
            paramsObj[param[0]] = param[1];
          });
        }

        observer.next(paramsObj);
        observer.complete();
    });

    return urlParams;
  }

  public static countVisitedPages(reset: boolean = false): number {
    let uvp: number = sessionStorage.getItem('user_visited_pages') && !reset ? parseInt(sessionStorage.getItem('user_visited_pages')) : 0;
        uvp ++;

    sessionStorage.setItem('user_visited_pages', uvp.toString());

    return uvp;
  }
}
