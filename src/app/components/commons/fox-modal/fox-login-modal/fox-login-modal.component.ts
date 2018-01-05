import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { globals } from '_constants';
import { GeolocationService } from 'app/services/geolocation/geolocation.service';
import { LocationModel } from 'app/models/fox-location/location.model';

@Component({
  selector: 'fox-login-modal',
  templateUrl: './fox-login-modal.component.html',
  styleUrls: ['./fox-login-modal.component.scss']
})
export class FoxLoginModalComponent implements OnInit {
  @ViewChild('foxLogin') public foxLogin: ModalDirective;

  public loginUrl: string;
  private location: LocationModel;

  constructor(private geoLocation: GeolocationService) { }

  ngOnInit() {
    this.geoLocation.getLocation().subscribe( (location) => {
      if (location) {
        this.location = location;
        this.setLoginUrl();
      }
    });
  }

  open(target?: string) {
    if (this.location) {
      this.setLoginUrl(target);
      this.foxLogin.show();
    }
  }

  close() {
    this.foxLogin.hide();
  }

  reset() {
    this.loginUrl = '';
    setTimeout(() => this.setLoginUrl(), 100);
  }

  private setLoginUrl(target?: string): void {
    if (target) {
      this.loginUrl = globals.getLoginUrl(target, this.location.countryCode);
    } else {
      this.loginUrl = globals.getLoginUrl(document.location.href, this.location.countryCode);
    }
  }
}
