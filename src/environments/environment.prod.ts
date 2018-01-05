export const environment = {
  baseDomainUrl: 'https://play.foxsportsla.com',
  production: true,
  returnUrl: '',
  foxEvergentHost: 'https://fox36-web.evergent.com',
  foxEvergentApi: 'https://rest.evergent.com',
  contentServiceApiUrl: 'https://content.foxsportsla.com',
  authorizationApiUrl: 'https://auth.foxsportsla.com',
  foxToolBoxStatusEP: 'https://sp.tbxnet.com/v2/auth/fp/status.json',
  loginPath: '/sociallogins/login',
  logoutPath: '/logout/logout',
  loginTries: 3,
  foxSportsApiUrl: 'https://fsappcore.foxsportsla.com/api/',
  locationEndpoint: 'location',
  cableProviderEndpoint: 'mso',
  AWS_POOL_ID: 'us-west-2:7e362dcd-522e-48dc-9635-8c19ce4ac896',
  AWS_REGION: 'us-west-2',
  AWS_STREAM: 'stgprd-eventlogger-stream',
  AWS_API_VERSION_FIREHOSE: '2015-08-04',
  adsAndTracking: {
    segment: {
      enabled: true,
      key: 'MVBcGEESZcqD0RSmEVCWCJfNC8WjfdXN'
    },
    youboraAccountCode: 'foxlatam',
    gtm: {
      gtmId: 'GTM-PJ2PHH'
    },
    newRelic: { 
      enabled: true,
      beacon: 'bam.nr-data.net',
      errorBeacon: 'bam.nr-data.net',
      licenseKey: 'f4f418cd98',
      applicationID: '74541801',
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
