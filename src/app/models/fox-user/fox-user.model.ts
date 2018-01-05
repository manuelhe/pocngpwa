export interface FoxUserModel {
  loggedin: boolean;
  loading: boolean;
  token: string;
  justLogged: boolean;
  rawUser: {
    id: number,
    message: string,
    responseCode: number,
    status:  {
      description: string
    },
    authToken: string,
    stateID: number,
    subscriptionTypeDateUpdated: string,
    identityProvider: {
      description: string,
      referenceID: number
    },
    cableProvider: {
      country_code: string,
      short_name: string,
      description: string,
      logo: string,
      phone: string,
      business_phone: string,
      upgrade_url: string,
      cost: string
    },
    subscriberID: number,
    language: {
      description: string,
      isoCode: string
    },
    subscriptionTypeID: number,
    profile: {
      id: number,
      emailIsVerified: boolean,
      firstName: string,
      lastName: string,
      allowTracking: boolean,
      alertNotificationPush: boolean,
      alertNotificationEmail: boolean,
      main: boolean
    },
    country: {
      description: string,
      isoCode: string
    }
  };
}
