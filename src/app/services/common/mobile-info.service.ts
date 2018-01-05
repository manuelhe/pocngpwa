import { Injectable } from '@angular/core';
import { Ng2DeviceService } from 'ng2-device-detector';

import { FOX_CONSTANTS } from '../../reducers/common/fox-constants';

const IPAD_DEVICE = FOX_CONSTANTS.MOBILE_INFO.IPAD_DEVICE;
const IPHONE_DEVICE = FOX_CONSTANTS.MOBILE_INFO.IPHONE_DEVICE;
const ANDROID_OS = FOX_CONSTANTS.MOBILE_INFO.ANDROID_OS;
const MOBILE_VIEWPORT_SIZE = FOX_CONSTANTS.MOBILE_INFO.MOBILE_VIEWPORT_SIZE;
const TABLET_VIEWPORT_SIZE = FOX_CONSTANTS.MOBILE_INFO.TABLET_VIEWPORT_SIZE;
const DEFAULT_DESKTOP_VIEWPORT_SIZE = FOX_CONSTANTS.MOBILE_INFO.DEFAULT_VIEWPORT_SIZE;
const HIRES_DESKTOP_VIEWPORT_SIZE = FOX_CONSTANTS.MOBILE_INFO.HIRES_VIEWPORT_SIZE;
const MAC_OS = FOX_CONSTANTS.OS_INFO.MAC;
const BROWSER_SAFARI = FOX_CONSTANTS.BROWSER_INFO.SAFARI;
const BROWSER_CHROME = FOX_CONSTANTS.BROWSER_INFO.CHROME;


@Injectable()
export class MobileInfoService {
  deviceInfo = null;

  constructor(private deviceService: Ng2DeviceService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  public isMobile = () => ( this.isAppleDevice() || this.isAndroidDevice() );
  // para mac validar devices ipad / iphone para android valido os android nada mas
  isAppleDevice = () => (
    this.deviceInfo.device === IPHONE_DEVICE ||
    this.deviceInfo.device === IPAD_DEVICE );

  isAndroidDevice = () => this.deviceInfo.os === ANDROID_OS;

  windowType(): string {
    if (window.matchMedia(`(max-width: ${MOBILE_VIEWPORT_SIZE}px)`).matches) {
      return 'mobile';
    } else if (window.matchMedia(`(min-width: ${MOBILE_VIEWPORT_SIZE}px) and (max-width: ${TABLET_VIEWPORT_SIZE}px)`).matches) {
      return 'tablet';
    } else if (window.matchMedia(`(min-width: ${TABLET_VIEWPORT_SIZE}px) and (max-width: ${HIRES_DESKTOP_VIEWPORT_SIZE}px)`).matches) {
      return 'desktop';
    } else {
     return 'hires';
    }
  };

  isDefaultWindowSize(): boolean {
   return window.outerWidth <= DEFAULT_DESKTOP_VIEWPORT_SIZE;
  }

  isMacOs = () => this.deviceInfo.os === MAC_OS;

  isChrome = () => this.deviceInfo.browser === BROWSER_CHROME;
  isSafari = () => this.deviceInfo.browser === BROWSER_SAFARI;

}
