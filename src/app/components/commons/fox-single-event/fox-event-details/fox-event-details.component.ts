import {Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'fox-event-details',
  templateUrl: './fox-event-details.component.html',
  styleUrls: ['./fox-event-details.component.scss']
})
export class FoxEventDetailsComponent implements OnInit {

  @ViewChild('eventName') nameElem;

  @Input() public event: any;
  @Output() public onClickEvent: EventEmitter<any> = new EventEmitter();

  private _isLive: boolean;
  private _eventTime: string;

  @Input('isLive') public set isLive(live: boolean) {
    this._isLive = live;
  }
  public get isLive(): boolean {
    return this._isLive;
  }

  public set eventTime(time: string) {
    this._eventTime = time;
  }
  public get eventTime(): string {
    return this._eventTime;
  }

  constructor() { }

  ngOnInit() {
    const eventStartDate = new Date(this.event.startDate * 1000);
    const eventStartTime = eventStartDate.getHours() + ':' +
      (eventStartDate.getMinutes().toString().length < 2 ? '0' : '') + eventStartDate.getMinutes();

    this.eventTime = eventStartTime;
  }

  onClick() {
    this.onClickEvent.emit();
  }

}
