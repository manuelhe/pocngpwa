import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { smil } from './smil.parser';
import { globals } from '../../../../../../_constants';

@Injectable()
export class Regular {

  constructor(private http: Http) {
  }

  config(instance: any, configuration: any): Observable<any> {
    let params = {
      'mbr': 'true',
      'feed': 'FoxPlay Live Events',
      'auth': configuration.authToken,
      'manifest': 'm3u',
      'formats': globals.player.formats,
      'format': 'SMIL'
    };
    params = Object.assign({}, params, configuration.dfp);
    return this.http.get(configuration.releaseUrl, { search: params})
      .flatMap(response => smil.parse((<any>response)._body))
      .map((res) => ({videoUrl: res.body.videoUrl, vastUrl: res.body.vastUrl}))
      .first();
  }
}
