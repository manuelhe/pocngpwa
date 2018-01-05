import { environment } from './environments/environment';
const { version: appVersion, name: appName } = require('../package.json');

export const globals = {
  appVersion: appVersion,
  appName: appName,
  baseDomainUrl: environment.baseDomainUrl,
  isProd: environment.production,
  returnUrl: environment.returnUrl,
  foxEvergentHost: environment.foxEvergentHost,
  foxEvergentApi: environment.foxEvergentApi,
  foxToolBoxStatusEP: environment.foxToolBoxStatusEP,
  foxSportsApiUrl: environment.foxSportsApiUrl,
  locationEndpoint: environment.locationEndpoint,
  cableProviderEndpoint: environment.cableProviderEndpoint,
  getLocationApi: function () {
    return `${this.foxSportsApiUrl}${this.locationEndpoint}`;
  },
  getCableProviderApi: function(country: string = 'AR') {
    return `${this.foxSportsApiUrl}${this.cableProviderEndpoint}?country=${country}`;
  },
  loginPath: environment.loginPath,
  logoutPath: environment.logoutPath,
  loginTries: environment.loginTries,
  navigationBaseUrl: 'https://www.foxsports.com.ar',
  getLoginUrl: function (retUrl: string = '', country: string= 'AR') {
    return `${this.foxEvergentHost}${this.loginPath}?&Channel=Sports&displayfoxkey=no&country=${country}&app=YES&returnurl=${retUrl || this.returnUrl}`;
  },
  getLogoutUrl: function (retUrl: string = '', country: string = 'AR', userToken: string) {
    return `${this.foxEvergentHost}${this.logoutPath}?&returnurl=${retUrl || this.returnUrl}&country=${country}&ev_user_token=${userToken}`;
  },
  contentServiceApiUrl: environment.contentServiceApiUrl,
  authorizationApiUrl: environment.authorizationApiUrl,
  getApiEndPoint: function (service, path) {
    let url: string;
    switch (service) {
      case 'content':
        url = this.contentServiceApiUrl;
        break;
      case 'auth':
        url = this.authorizationApiUrl;
        break;
    }
    return `${url}${path}`;
  },
  getEvApiEndPoint: function(path) {
    return `${this.foxEvergentApi}/ev/${path}`;
  },
  mobile_event_redirect_url: 'https://www.foxsportsla.com/watch/E',
  adsAndTracking: {
    segment: {
      enabled: environment.adsAndTracking.segment.enabled,
      key: environment.adsAndTracking.segment.key
    },
    dfp: {
      dfpAdId: 62955556,
      dfpAdNameBase: 'foxsports-web/play/'
    },
    youboraAccountCode: environment.adsAndTracking.youboraAccountCode,
    gtm: environment.adsAndTracking.gtm,
    newRelic: environment.adsAndTracking.newRelic.enabled
  },
  mobile: {
    store_url: 'http://fsp.app.link',
    app_url: 'foxsports://weblinking'
  },
  player: {
    formats: 'mpeg4,m3u,webm,ogg,mp3',
    extenders: {
      premium: {
        request: 'https://link.theplatform.com/s/flac/qAiGVpXDoQCR',
        countriesExcluded: ['cl']
      }
    }
  },
  hostedSolutions: {
    matchInformationUrl: environment.hostedSolutions.matchInformationUrl,
    scheduleUrl: 'https://statistics.ficfiles.com',
    url: 'https://foxsportslatam.stats.com/matchcast/football/clients/foxla/index.html',
    competitions: ['ARGE', 'BUND', 'SERI', 'CHLG', 'LIB', 'UEFA', 'SUD']
  }
};
