import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { KSSwiperContainer } from '../../../../assets/libs/ks-swiper/dist';
import { BasicActionsService } from '../../../services/common/basic-actions.service';

@Component({
  selector: 'fox-event-strip',
  templateUrl: './fox-event-strip.component.html',
  styleUrls: ['./fox-event-strip.component.scss']
})
export class FoxEventStripComponent {
  private _title: string;
  private _events: Array<any>;
  private _isEmpty: boolean;

  public loadingEvent: string;

  public get title(): string {
    return this._title;
  }

  @Input('title') public set title(title: string) {
    this._title = title;
  }

  public get events(): Array<any> {
    return this._events;
  }

  @Input('events') public set events(events: Array<any>) {
    this._events = events;
  }

  public get isEmpty(): boolean {
    return this._isEmpty;
  }

  @Input('isEmpty') public set isEmtpy(empty: boolean) {
    this._isEmpty = empty;
  }

  public showAs  = 'carddisplay'; // fulldisplay | carddisplay
  public isLive = true;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  public carouselOptions: object;

  constructor(
    private el: ElementRef,
    private basicActionsService: BasicActionsService
  ) {
    const _this = this;

    this.carouselOptions = {
      speed: 1000,
      loop: false,
      autoplayDisableOnInteraction: false,
      slidesPerView: 'auto',
      nextButton: '.carousel-next',
      prevButton: '.carousel-prev',
      preloadImages: false,
      onInit: function (swpr) {
        el.nativeElement.querySelector('.arrow-left').style.display = 'none';

        if (swpr.isEnd) {
          el.nativeElement.querySelector('.arrow-right').style.display = 'none';
        }
      },
      onTransitionStart: function (swpr) {
        // Used as hack to activate the lazy loading of images
        const scrollVal = window.scrollY;
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, scrollVal);

        if (swpr.isBeginning) {
          el.nativeElement.querySelector('.arrow-left').style.display = 'none';
        } else {
          el.nativeElement.querySelector('.arrow-left').style.display = 'block';
        }

        if (swpr.isEnd) {
          el.nativeElement.querySelector('.arrow-right').style.display = 'none';
        } else {
          el.nativeElement.querySelector('.arrow-right').style.display = 'block';
        }
      }
    };
  }

  public playEvent(event) {
    this.loadingEvent = event.id;
    this.basicActionsService.playEvent(event);
  }

  movePrev() {
    this.swiperContainer.swiper.slidePrev();
    window.scrollTo(0, window.scrollY);
  }
  moveNext() {
    this.swiperContainer.swiper.slideNext();
    window.scrollTo(0, window.scrollY);
  }
}
