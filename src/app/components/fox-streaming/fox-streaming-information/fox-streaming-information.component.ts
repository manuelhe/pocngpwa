import { Component, OnInit } from '@angular/core';

import { FoxEventService } from '../../../services/fox-event/fox-event.service';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from 'app/services/geolocation/geolocation.service';

@Component({
  selector: 'fox-streaming-information',
  templateUrl: './fox-streaming-information.component.html',
  styleUrls: ['./fox-streaming-information.component.scss']
})
export class FoxStreamingInformationComponent implements OnInit {

  public pageLoaded: boolean;

  public channels: Array<any>;
  public eventsTodayLater: Array<any>;
  public eventsTomorrow: Array<any>;

  public dateTitles = {
    'todayLater': 'Más tarde',
    'tomorrow': 'Mañana'
  };

  constructor (
    private eventService: FoxEventService,
    private translate: TranslateService,
    private geoLocation: GeolocationService
  ) {
    this.pageLoaded = false;
  }

  private objectToArray(obj): Array<any> {
    return Object.keys(obj).map( key => obj[key]);
  }

  ngOnInit() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    this.geoLocation.getLocation().subscribe((location) => {
      if (location) {
        this.translate.get('todayLater').subscribe((res: string) => {
          this.dateTitles.todayLater = res;
        });

        this.translate.get('tomorrow').subscribe((res: string) => {
          this.dateTitles.tomorrow = res;
        });
      }
    });

    this.eventService.getAll(0, 300).subscribe((events) => {
      if (events) {
        events = this.objectToArray(events);

        this.eventsTodayLater = this.eventService.getByDate(events, today);
        this.eventsTomorrow = this.eventService.getByDate(events, tomorrow);
        this.pageLoaded = true;
      }
    });

    this.eventService.getChannels().subscribe((channels) => {
      if (channels) {
        this.channels = channels;
      }
    });

  };
}

