import { Component, OnInit, ElementRef, ViewChild, HostListener, Injectable, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoxUserModel } from '../../../models/fox-user/fox-user.model';
import { FoxUserService } from '../../../services/fox-user/fox-user.service';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { FoxEventService } from '../../../services/fox-event/fox-event.service';
import { MobileInfoService } from '../../../services/common/mobile-info.service';
import { BasicActionsService } from '../../../services/common/basic-actions.service';
import { TrackingInformationService } from '../../../services/common/tracking-information.service';
import { DOCUMENT } from '@angular/platform-browser';

import { globals } from '_constants';

@Component({
  selector: 'fox-header-navigation',
  templateUrl: './fox-header-navigation.component.html',
  styleUrls: ['./fox-header-navigation.component.scss']
})
export class FoxHeaderNavigationComponent implements OnInit {
  public showBurgerMenu: boolean;
  public user: FoxUserModel;
  public isMobile: boolean = false;
  public helpdeskTxt: string;
  public helpdeskUrl: string;
  private _document: any;
  private eventTitle: string;
  navigationLinks: any;

  @ViewChild('logoutPopover') logoutPopover: any;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    const userBtn = this.eRef.nativeElement.querySelector('#userBtn');

    if (this.logoutPopover) {
      // If user clicked the button
      if (userBtn === event.target || userBtn.firstElementChild === event.target) {
        // And the popover is visible
        if (this.logoutPopover.isOpen) {
          this.logoutPopover.hide();
        } else {
          // Else show the popover
          this.logoutPopover.show();
        }
      } else {
        // Else hide the popover
        this.logoutPopover.hide();
      }
    }
  }

  constructor(
    private userService: FoxUserService,
    private route: ActivatedRoute,
    private eRef: ElementRef,
    private geoLocation: GeolocationService,
    private eventService: FoxEventService,
    private mobileService: MobileInfoService,
    private basicActionsService: BasicActionsService,
    private trackingService: TrackingInformationService,
    @Inject(DOCUMENT) private document
  ) {
    this.showBurgerMenu = false;
    this._document = document;
    this.navigationLinks = {};
  }

  ngOnInit() {
    this
    .userService
    .getUser()
    .subscribe((user) => {
      if(user){
        this.user = user;
      }

      /*if (!this.user.loggedin && !this.user.loading) {
        this.route.queryParams
        .subscribe((params) => {
          if (params['login'] && params['login'] === 'true') {
            if (params['evid']) {
              // load dataLayer and send
              this.trackingService.pushDataLayer({
                'event': 'ctaPromptVideo',
                'message': 'loginRequired'
              });
              console.log('GTM: DataLayer: --->', this.trackingService.getDataLayer());
            }

            this.showLogin();
          }
        });
      }*/
    });

    this.geoLocation.getLocation().subscribe((location) => {
      if (location) {
        switch (location.lang) {
          case 'es':
            this.helpdeskTxt = 'Centro de Ayuda';
            this.helpdeskUrl = 'https://foxsports.zendesk.com/hc/es';
            break;
          case 'pt':
            this.helpdeskTxt = 'Centro de Ajuda';
            this.helpdeskUrl = 'https://foxsports.zendesk.com/hc/pt-br';
            break;
        }
        const countryCode = location.countryCode.toLowerCase();
        this.navigationLinks = this.createNavigationLinks(countryCode);
      }
    });

    if (this.mobileService.isMobile()) {
      this.isMobile = true;

      // Get the event information
      this
      .route
      .queryParams
      .subscribe((params) => {
        if (params['ev_id']) {
          this
          .eventService
          .getAllEventsWithChannels(0, 300)
          .subscribe((evs) => {
            if (evs) {
              const evsArr = Object.keys(evs).map((key) => evs[key]);
              const event = evsArr.filter((evt) => evt.id === params['ev_id'])[0];
              this.eventTitle = event ? event.title : undefined;
            }
          });
        } else {
          this.eventTitle = undefined;
        }
      });
    }
  }

  showLogin() {
    this.basicActionsService.showLoginModal();
  }

  toggleBurger() {
    this.showBurgerMenu = !this.showBurgerMenu;

    if (this.showBurgerMenu) {
      this._document.querySelector('body').classList.add('menu-shown');
    } else {
      this._document.querySelector('body').classList.remove('menu-shown');
    }
  }

  private createNavigationLinks(country: string): any {

    const urlDefinition = {
      topLevelDomain: `com.${country}`,
      domain: 'foxsports',
      folder: '',
      subdomain: 'www'
    };

    if (['sv', 'cl'].indexOf(country) >= 0 ) {
      urlDefinition.topLevelDomain = country;
    }

    if (['cr', 'do', 'hn', 'ni', 'pa'].indexOf(country) >= 0 ) {
      urlDefinition.topLevelDomain = 'com';
      urlDefinition.domain = 'foxsportsla';
      urlDefinition.folder = `/${country}`
    }

    const liveDefinition = Object.assign({}, urlDefinition, { domain: 'foxsportsla', topLevelDomain: 'com', subdomain: 'play' });
    if (country === 'br') {
      liveDefinition.domain = 'foxsports';
      liveDefinition.topLevelDomain = `com.${country}`;
    }

    const baseUrl = this.buildUrl(urlDefinition);
    const baseLiveUrl = this.buildUrl(liveDefinition);

    return {
      home: `${baseUrl}`,
      live: `${baseLiveUrl}/live`,
      news: `${baseUrl}/news`,
      videos: `${baseUrl}/videos`,
      blogs: `${baseUrl}/blogs/authors#latest`,
      today: `${baseUrl}/tv/schedule/today`,
      photos: `${baseUrl}/photos`,
      competition: `${baseUrl}/competition`,
      appDownload: `${baseUrl}/app`
    };
  }

  private buildUrl(definition: any):string {
    return `https://${definition.subdomain}.${definition.domain}.${definition.topLevelDomain}${definition.folder}`;
  }


}
