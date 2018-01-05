export const FOX_CONSTANTS = {
  LIVE_PERCENTAGE_CRITERIA: 99.7,
  BASIC_ACTIONS: {
    SHOW_LOGIN: 'SHOW_LOGIN'
  },
  STREAM_CONFIGURATION: {
    PRELOAD_CONFIGURATION: 'PRELOAD_CONFIGURATION',
    LOAD_ERROR_CONFIGURATION: 'LOAD_ERROR_CONFIGURATION',
    SET_STREAMING_EVENT: 'SET_STREAMING_EVENT',
    SET_EVENT_AUTH: 'SET_EVENT_AUTH',
    ALLOW_FULL_SCREEN: 'ALLOW_FULL_SCREEN'
  },
  MOBILE_INFO: {
    IPAD_DEVICE : 'ipad',
    IPHONE_DEVICE : 'iphone',
    ANDROID_OS : 'android',
    MOBILE_VIEWPORT_SIZE: 576,
    TABLET_VIEWPORT_SIZE: 1024,
    DEFAULT_VIEWPORT_SIZE: 1920,
    HIRES_VIEWPORT_SIZE: 2560
  },
  OS_INFO: {
    MAC: 'mac',
    WINDOWS: 'windows',
    LINUX: 'linux'
  },
  BROWSER_INFO: {
    SAFARI: 'safari',
    CHROME: 'chrome'
  },
  USER: {
    UPDATE: 'UPDATE_USER',
    LOGOUT: 'LOGOUT'
  },
  LOCATION: {
    UPDATE : 'updateLocation'
  },
  EVENTS: {
    LOADEVENTSONLY : 'loadEventsOnly',
    LOADEVENTSWITHCHANNELS: 'loadEventsWithChannels',
    LOADLIVEEVENTSWITHCHANNELS: 'loadLiveEventsWithChannels'
  },
  COUNTRY_LANG: [
    { country: 'BR', lang: 'pt' },
    { country: 'AR', lang: 'es' },
    { country: 'UY', lang: 'es' }
  ],
  COUNTRY_LANG_DEFAULT: { country: 'DEFAULT', lang: 'es' }
};
