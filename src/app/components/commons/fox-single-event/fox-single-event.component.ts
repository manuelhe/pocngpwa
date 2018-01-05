import {Component, Input, OnInit} from '@angular/core';

import { MobileInfoService } from '../../../services/common/mobile-info.service';

import { StreamEventModel } from '../../../models/fox-live/stream-event.model';

@Component({
  selector: 'fox-single-event',
  templateUrl: './fox-single-event.component.html',
  styleUrls: ['./fox-single-event.component.scss']
})
export class FoxSingleEventComponent implements OnInit {
  @Input() isEmpty: boolean;

  @Input() showAs: string;
  @Input() isLive: boolean;
  @Input() event: StreamEventModel;

  @Input() loading: boolean;

  @Input('imgOffset') imgOffset: number;

  public errorImg: string;

  constructor(
    public mobileInfoService: MobileInfoService
  ) { }

  ngOnInit() {
    if (!this.isEmpty) {
      if (!this.imgOffset) {
        this.imgOffset = 300; // Set default offset for lazy loading
      }
      this.errorImg = '/assets/images/default-thumbnail-'
        + this.event.channel_info.display_name.toLowerCase().split(' ').join('-') + '.jpg';
    }
  }

  changeImgOnError() {
    this.errorImg = '/assets/images/default-thumbnail-'
      + this.event.channel_info.display_name.toLowerCase().split(' ').join('-') + '.jpg';
  }
}
