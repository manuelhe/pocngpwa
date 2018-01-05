import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { globals } from '../../../../_constants';
import { StreamConfigurationService } from '../../../services/fox-streaming/stream-configuration.service';


@Component({
  selector: 'fox-hosted-solution',
  templateUrl: './fox-hosted-solution.component.html',
  styleUrls: ['./fox-hosted-solution.component.scss']
})
export class FoxHostedSolution implements OnInit {

  hostedSolutionUrl:string;

  constructor(private http:Http, private streamConfigurationService: StreamConfigurationService) {

  }

  onIframeLoad(event) {
    try {
      event.currentTarget.height = event.currentTarget.contentWindow.document.scrollingElement.offsetHeight + 20 + 'px';
    }catch(ex) {

    }
  }

  ngOnInit() {
    this.streamConfigurationService.streamConfiguration.subscribe((config) => {
      if (!config || !config.event || !config.event.statsid) {
        return;
      }
      this.verifyHostedSolutionAvailability(config.event).subscribe((res) => {
        if (res) {
          this.hostedSolutionUrl = res.url;
        }
      });
    });
  }

  private verifyHostedSolutionAvailability(event: any): Observable<any> {
    return this.http
      .get(`${globals.hostedSolutions.matchInformationUrl}?match-code=${event.statsid}`)
      .map(res => res.json())
      .flatMap((res) => {
        if (!res || !res.competition) {
          throw Observable.throw({ NoData: true });
        }
        const slug = (res.competition['competition-slug'] || '').toUpperCase();
        if (globals.hostedSolutions.competitions.indexOf(slug) < 0 ) {
          throw Observable.throw({ NoSlug: true });
        }
        return this.findGlobalCode(slug, event.statsid).map(r => {
          if (!r) {
            return false;
          }
          return {
            url: `${globals.hostedSolutions.url}?lang=es&league=${slug.toLowerCase()}&gamecode=${r.globalCode}&nav=no`
          }
        });
      });
  }

  private findGlobalCode(competition: string, statsid: string): Observable<any> {
    const scheduleUrl = `${globals.hostedSolutions.scheduleUrl}/${competition.toLowerCase()}/${competition.toUpperCase()}_SCHEDULE.XML`;
    return this.http.get(scheduleUrl)
      .map((res) => {
        const body = (<any>res)._body;
        const regex = new RegExp(`<gamecode global-code="(\\d*)" code="${statsid}"`, 'g');
        const match = regex.exec(body);
        if (match != null) {
          return { globalCode: match[1] };
        }
        return false;
      })
  }

}
