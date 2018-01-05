import { Component, ViewChild, OnInit } from '@angular/core';
import { BasicActionsService } from '../../services/common/basic-actions.service';
import { KSSwiperContainer } from '../../../assets/libs/ks-swiper/dist';
import { FoxEventService } from '../../services/fox-event/fox-event.service';
import { MobileInfoService } from '../../services/common/mobile-info.service';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { FoxUserService } from '../../services/fox-user/fox-user.service';
import { TrackingInformationService } from '../../services/common/tracking-information.service';

@Component({
  selector: 'fox-live',
  templateUrl: './fox-live.component.html',
  styleUrls: ['./fox-live.component.scss']
})
export class FoxLiveComponent implements OnInit {

  public carouselLoaded: boolean;
  public stripsLoaded: boolean;

  public isMobile: boolean;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;

  public clickedEventId: string;
  public carouselOptions: object;

  public carouselShowAs = 'fulldisplay';
  public isLive = true;

  // Channels
  public channels = [];

  // Events
  public eventsLive: Array<any>;
  public eventsTodayLater: Array<any> = [];
  public eventsTomorrow: Array<any> = [];
  public eventsThirdDayFromNow: Array<any> = [];
  public eventsFourthDayFromNow: Array<any> = [];
  public eventsFifthDayFromNow: Array<any> = [];
  public eventsSixthDayFromNow: Array<any> = [];
  public eventsSeventhDayFromNow: Array<any> = [];

  public loadingEvent: string;

  public dateTitles = {
    'todayLater': 'Más tarde',
    'tomorrow': 'Mañana',
    'thirdDayFromNow': '',
    'fourthDayFromNow': '',
    'fifthDayFromNow': '',
    'sixthDayFromNow': '',
    'seventhDayFromNow': ''
  };

  public day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  constructor(
    private basicActionsService: BasicActionsService,
    public mobileInfoService: MobileInfoService,
    private eventService: FoxEventService,
    private translate: TranslateService,
    private geoLocation: GeolocationService,
    private userService: FoxUserService,
    private trackingService: TrackingInformationService,
  ) {
    this.isMobile = mobileInfoService.isMobile();
  }

  public playEvent(event) {
    this.loadingEvent = event.id;
    this.basicActionsService.playEvent(event);
  }

  private objectToArray(obj): Array<any> {
    return Object.keys(obj).map( key => obj[key]);
  }

  ngOnInit() {
    this.createSliderConfiguration();

    this.trackingService.pageSegmentEvent('live');

    const zeroHsDate = () => { return new Date(new Date().setHours(0, 0, 0, 0)); };

    let currentLocation: any;
    const today = new Date();

    const tomorrow = zeroHsDate();
    tomorrow.setDate(today.getDate() + 1);

    const thirdDayFromNow = zeroHsDate();
    thirdDayFromNow.setDate(today.getDate() + 2);

    const fourthDayFromNow = zeroHsDate();
    fourthDayFromNow.setDate(today.getDate() + 3);

    const fifthDayFromNow = zeroHsDate();
    fifthDayFromNow.setDate(today.getDate() + 4);

    const sixthDayFromNow = zeroHsDate();
    sixthDayFromNow.setDate(today.getDate() + 5);

    const seventhDayFromNow = zeroHsDate();
    seventhDayFromNow.setDate(today.getDate() + 6);

    // Cargo las traducciones de los titulos de los stripes
    this.geoLocation.getLocation().first(location => location != null).subscribe((location) => {
      currentLocation = location;

      if (currentLocation) {
        const messages = [
          'todayLater',
          'tomorrow',
          this.day[thirdDayFromNow.getDay()],
          this.day[fourthDayFromNow.getDay()],
          this.day[fifthDayFromNow.getDay()],
          this.day[sixthDayFromNow.getDay()],
          this.day[seventhDayFromNow.getDay()]
        ];

        this.translate.get(messages).first(res => res != null).subscribe((res: string) => {
          const result = Object.keys(res).map(key => res[key]);
          this.dateTitles.todayLater = result[0];
          this.dateTitles.tomorrow = result[1];
          this.dateTitles.thirdDayFromNow = result[2] + ' ' + thirdDayFromNow.getDate();
          this.dateTitles.fourthDayFromNow = result[3] + ' ' + fourthDayFromNow.getDate();
          this.dateTitles.fifthDayFromNow = result[4] + ' ' + fifthDayFromNow.getDate();
          this.dateTitles.sixthDayFromNow = result[5] + ' ' + sixthDayFromNow.getDate();
          this.dateTitles.seventhDayFromNow = result[6] + ' ' + seventhDayFromNow.getDate();
        });
      }
    });

    const contentImpression = [];

    this
      .eventService
      .getAllLiveEventsWithChannels(0, 300)
      .first(events => events != null)
      .subscribe((events) => {
        events = this.objectToArray(events);
        this.eventsLive = events;
        this.carouselLoaded = true;

        events.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: 'En Vivo'
          });
        });
      
      });

    this
      .eventService
      .getAllEventsWithChannels(0, 300)
      .first(events => events != null)
      .subscribe((events) => {
        events = this.objectToArray(events);

        this.eventsTodayLater = this.eventService.getByDate(events, today);
        this.eventsTomorrow = this.eventService.getByDate(events, tomorrow);
        this.eventsThirdDayFromNow = this.eventService.getByDate(events, thirdDayFromNow);
        this.eventsFourthDayFromNow = this.eventService.getByDate(events, fourthDayFromNow);
        this.eventsFifthDayFromNow = this.eventService.getByDate(events, fifthDayFromNow);
        this.eventsSixthDayFromNow = this.eventService.getByDate(events, sixthDayFromNow);
        this.eventsSeventhDayFromNow = this.eventService.getByDate(events, seventhDayFromNow);

        // console.log(this.eventsTodayLater);

        this.eventsTodayLater.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.todayLater
          });
        });

        this.eventsTomorrow.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.tomorrow
          });
        });

        this.eventsThirdDayFromNow.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.thirdDayFromNow
          });
        });

        this.eventsFourthDayFromNow.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.fourthDayFromNow
          });
        });

        this.eventsFifthDayFromNow.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.fifthDayFromNow
          });
        });

        this.eventsSixthDayFromNow.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.sixthDayFromNow
          });
        });

        this.eventsSeventhDayFromNow.map((event) => {
          contentImpression.push({
            name: event.title,
            id: event.id,
            type: event.isChannel ? 'channel' : 'event',
            team: '',
            competition: event.label,
            list: this.dateTitles.seventhDayFromNow
          });
        });

        this.trackingService.pushDataLayer({'contentImpression': contentImpression});
        //console.log('GTM: DataLayer: --->', this.trackingService.getDataLayer());

        this.stripsLoaded = true;
      
      });
  }

  moveNext() { this.swiperContainer.swiper.slideNext(); }
  movePrev() { this.swiperContainer.swiper.slidePrev(); }

  windowType(): string { return this.mobileInfoService.windowType(); }

  private createSliderConfiguration(): void {
    const slidesPerView = () => {
      if (this.windowType() === 'tablet') {
        return 1.4;
      } else if (this.windowType() === 'desktop') {
        return 2.5;
      } else {
        return 3;
      }
    };

    const self = this;
    const commonConf = {
      freeMode: false,
      nextButton: '.carousel-next',
      prevButton: '.carousel-prev',
      simulateTouch: true,
      shortSwipes: false,
      longSwipes: true,
      followFinger: true,
      onlyExternal: false,
      onTap(swiper, ev) {
        const clickedEventId = swiper.clickedSlide.children[0].children[0].innerHTML;
        const event = self.eventsLive.find((ev) => {
          return ev.id === clickedEventId;
        })
        self.playEvent(event);
      },
      onSlideChangeStart: () => {
        // Used as hack to activate the lazy loading of imagaes
        const scrollVal = window.scrollY;
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, scrollVal);
      },
      onInit: (swpr) => {
        swpr.slides.each((i) => {
          const slide = swpr.slides[i];
          slide.style.height = 'auto';
          if (swpr.slides.length > 2) {
            // Swaps images srcs for the duplicate slides created by the slider to match the same as the original slides
            if (slide.classList.contains('swiper-slide-duplicate')) {
              const imgArr = slide.querySelectorAll('img');
              imgArr[1].src = imgArr[0].src;
            }
          }
        });
      }
    };

    const customConf = {
      speed: 4000, // Velocidad del slide
      autoplay: 4000, // Velocidad entre slide y slide
      loop: true,
      spaceBetween: 20,
      autoplayDisableOnInteraction: false,
      slidesPerView: slidesPerView(),
      loopedSlides: 10,
      centeredSlides: true
    };
    this.carouselOptions = Object.assign(commonConf, customConf);
  }
}
