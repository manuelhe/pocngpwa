import {Input, Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import { globals } from '../../../../_constants';
import { Observable } from 'rxjs/Rx';

declare const googletag: any;

@Component({
  selector: 'fox-dfp-ad',
  templateUrl: './fox-dfp-ad.component.html',
  styleUrls: ['./fox-dfp-ad.component.scss']
})
export class FoxDFPAdComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  public id: string;
  public tagIndex: number;

  @Input() width: number;
  @Input() height: number;

  @ViewChild('adContainer') container;

  constructor() {}

  ngOnInit() {
    if (!this.name) {
      this.name = '';
    }
    this.id = Math.floor(Math.random() * (10000 - 1) + 1).toString();
    this.defineAds(this.name, this.id, this.width, this.height);
    this.displayAd();
  }

  defineAds(adName: string, id: string, adWidth: number, adHeight: number): void {
    googletag.cmd = googletag.cmd || [];
    this.tagIndex = googletag.cmd.j;
    googletag.cmd.push(function () {
      googletag.defineSlot(`${globals.adsAndTracking.dfp.dfpAdId}/${globals.adsAndTracking.dfp.dfpAdNameBase}${adName}`,
        [ [adWidth, adHeight] ], `div-gpt-ad-${id}-${googletag.cmd.j}`).
      addService(googletag.pubads());
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  }

  displayAd(): void {
    this.container.nativeElement.setAttribute('id', `div-gpt-ad-${this.id}-${this.tagIndex}`);
    if (googletag && googletag.apiReady) {
      googletag.cmd.push( googletag.display(`div-gpt-ad-${this.id}-${this.tagIndex}`) );
    }
  }

  ngAfterViewInit() {
    const iframe = this.container.nativeElement.querySelector('iframe');
    if (iframe) {
      Observable.timer(200, 200).subscribe(() => {
        if (iframe.contentWindow) {
          const body = iframe.contentWindow.document.querySelector('body');
          const html = iframe.contentWindow.document.querySelector('html');
          const height = Math.max( body.scrollHeight, body.offsetHeight, html.offsetHeight );
          if (height) {
            iframe.style.height = height + 'px';
          } else {
            iframe.style.height = iframe.height + 'px';
          }
        }
      });
    }
  }
}
