import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FoxEventService } from '../../services/fox-event/fox-event.service';
import { MobileInfoService } from '../../services/common/mobile-info.service';
import { globals } from '../../../_constants';

@Component({
  selector: 'fox-mobile-app',
  templateUrl: './fox-mobile-app.component.html',
  styleUrls: ['./fox-mobile-app.component.scss']
})
export class FoxMobileAppComponent implements OnInit {
  public loading: boolean;

  private slug: string;
  private event: any;
  private appUrl: string;
  private appStoreUrl: string;

  constructor(
    private eventService: FoxEventService,
    private route: ActivatedRoute,
    private router: Router,
    private mobileService: MobileInfoService
  ) { }

  ngOnInit() {
    this.loading = true;
    if (!this.mobileService.isMobile()) {
      // Redicert to streaming
      this.router.navigate(['/']);
    } else {
      // Get the event information
      this.route.params
      .take(1)
      .subscribe((params) => {
        this.slug = params.slug
        if (this.slug) {

          this.appStoreUrl = globals.mobile.store_url;

          this
          .eventService
          .getAll(0, 300)
          .first(r => r != null)
          .flatMap((r) => {
            return this.eventService
              .getChannels()
              .map(c => {
                const list = c.map((item) => this.eventService.convertChannelIntoEvent(item));
                return {
                  events: r,
                  channels: list
                };
              })
          })
          .subscribe((result) => {
            if (result) {
              const evsArr = Object.keys(result.events).map((key) => result.events[key]);

              this.event = evsArr.filter((event) => event.slug === this.slug)[0];
              if (!this.event) {
                this.event = result.channels.filter((event) => event.slug === this.slug)[0];
              }
              this.loading = false;

              const eventId = this.event.id;
              const evid = eventId.split('_')[0];

              if (eventId.split('_').length === 1) {
                // is a channel
                // foxsports://weblinking?contentType=channel&content_id=foxsports3
                const chName = this.getChannelName(evid);
                this.appUrl = `${globals.mobile.app_url}?contentType=channel&content_id=${chName}`;
              } else {
                // is an event
                this.appUrl = `${globals.mobile.app_url}?contentType=watch&content_id=E${evid}`;
              }
            }
          });
        }
      });
    }
  }

  // TODO: Esta función se debe removerse cuando el objeto evento
  // venga unificado con channels desde el BE
  private getChannelName(evId: string): string {
    switch (evId) {
      case '0':
        return 'foxsports';
      case '1':
        return 'foxsports2';
      case '2':
        return 'foxsports3';
      default:
        return evId;
    }
  }
}
