import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/timeout';
import { Http } from '@angular/http';

import { smil } from './smil.parser';
import { globals } from '../../../../../../_constants';

@Injectable()
export class Premium {

  private concurrencyValues: any;
  private timerSubscription: Subscription;

  constructor(private http: Http) {
  }

  config(instance: any, configuration: any): Observable<any> {
    let params = {
      'mbr': true,
      'feed': 'FoxPlay Live Events',
      'clientId': 'playerIOS',
      'format': 'SMIL',
      'auth': configuration.authToken,
      'formats': globals.player.formats
    };
    params = Object.assign({}, params, configuration.dfp);
    return this.http.get(globals.player.extenders.premium.request, { search: params })
      .flatMap(response => smil.parse((<any>response)._body))
      .map((res) => {
        if (res.errors) {
          throw Observable.throw(res.errors);
        }
        this.concurrencyValues = res.head;
        this.timerSubscription = this.attachConcurrencyLock(instance, smil);
        instance.on('dispose', () => {
          this.timerSubscription.unsubscribe();
          this.unlockConcurrency();
        });
        return { videoUrl: res.body.videoUrl };
      })
      .first();
  }

  private attachConcurrencyLock(instance: any, smil: any): Subscription {
    this.concurrencyValues.updateLockInterval = (parseInt(this.concurrencyValues.updateLockInterval)-2)*1000;
    this.updateConcurrencyLock();
    return Observable.interval(this.concurrencyValues.updateLockInterval).subscribe(() => {
      this.updateConcurrencyLock();
    });
  }

  private updateConcurrencyLock() {
    const url = this.buildConcurrencyServiceUrl('update');
    this.http.get(url)
      .map(res => res.json())
      .subscribe((res) => {
        this.concurrencyValues.lockId = res.updateResponse.id;
        this.concurrencyValues.lockSequenceToken = res.updateResponse.sequenceToken;
        this.concurrencyValues.lock = res.updateResponse.encryptedLock;
      });
  }

  private unlockConcurrency() {
    const url = this.buildConcurrencyServiceUrl('unlock');
    const req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
  }

  private buildConcurrencyServiceUrl(service: string): string {
    return (this.concurrencyValues.concurrencyServiceUrl + `/web/Concurrency/${service}?schema=1.0&form=JSON&_clientId=playerIOS`
       + "&_id=" + encodeURIComponent(this.concurrencyValues.lockId)
       + "&_sequenceToken=" + encodeURIComponent(this.concurrencyValues.lockSequenceToken)
       + "&_encryptedLock=" + encodeURIComponent(this.concurrencyValues.lock));
  }

}
