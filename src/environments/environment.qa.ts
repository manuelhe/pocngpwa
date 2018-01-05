export const environment = {
  baseDomainUrl: 'http://qa-frontend-glb.foxites.com',
  production: false,
  returnUrl: this.baseDomainUrl + '/post-login',
  foxEvergentHost: 'https://fox36-web-stage.evergent.com',
  foxEvergentApi: 'https://rest-stage-va.evergent.com',
  contentServiceApiUrl: 'http://qa-backend-content-glb.foxites.com',
  authorizationApiUrl: 'http://qa-backend-auth-glb.foxites.com',
  foxToolBoxStatusEP: 'https://sp-cert.tbxnet.com/v2/auth/fp/status.json',
  loginPath: '/sociallogins/login',
  logoutPath: '/logout/logout',
  loginTries: 3,
  foxSportsApiUrl: 'https://stag-fsappcore.foxsportsla.com/api/',
  locationEndpoint: 'location',
  cableProviderEndpoint: 'mso',
  AWS_POOL_ID: 'us-west-2:9f33328b-9cd3-49bc-8e6d-0a5d0ab4223b',
  AWS_REGION: 'us-west-2',
  AWS_STREAM: 'devqa-eventlogger-stream',
  AWS_API_VERSION_FIREHOSE: '2015-08-04',
  adsAndTracking: {
    segment: {
      enabled: true,
      key: 'vLrkNAPvCltPquncHYMeXChDPUbokp8n'
    },
    youboraAccountCode: 'foxlatamdev',
    gtm: {
      gtmId: 'GTM-PJ2PHH'
    },
    newRelic: {
      enabled: false,
      beacon: '########',
      errorBeacon: '########',
      licenseKey: '########',
      applicationID: '########',
      sa: 1
    }
  },
  hostedSolutions: {
    matchInformationUrl: 'https://stats.foxsportsla.com/stats/get_results_by_matchcode_foxsports'
  },
  seo:{
    title: "Fox",
    description: "Fox Sports",
    ogTitle: "Fox",
    ogDescription: "Fox Sports",
    ogImage: "assets/fox-logo.png",
    twitterTitle: "Fox",
    twitterDescription: "Fox Sports",
    twitterImage: "assets/fox-logo.png"
  }
};
