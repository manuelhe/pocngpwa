import { FoxUserModel } from '../../models/fox-user/fox-user.model';
import { FOX_CONSTANTS } from '../common/fox-constants';
import { UserActions } from '../../actions/user.actions';

const initialUserState: FoxUserModel = {
  loggedin: false,
  loading: false,
  token: '',
  justLogged: false,
  rawUser: {
    'id': 0,
    'message': '',
    'responseCode': 0,
    'status': {
      'description': ''
    },
    'authToken': '',
    'stateID': 0,
    'subscriptionTypeDateUpdated': '',
    'identityProvider': {
      'description': '',
      'referenceID': 0
    },
    'cableProvider': {
      'country_code': '',
      'short_name': '',
      'description': '',
      'logo': '',
      'phone': '',
      'business_phone': '',
      'upgrade_url': '',
      'cost': ''
    },
    'subscriberID': 0,
    'language': {
      'description': '',
      'isoCode': ''
    },
    'subscriptionTypeID': 0,
    'profile': {
      'id': 0,
      'emailIsVerified': false,
      'firstName': '',
      'lastName': '',
      'allowTracking': false,
      'alertNotificationPush': false,
      'alertNotificationEmail': false,
      'main': false
    },
    'country': {
      'description': '',
      'isoCode': ''
    }
  }
};

export function FoxUserReducer(state: FoxUserModel, action: UserActions): FoxUserModel {
  let userState = state;

  switch (action.type) {
    case FOX_CONSTANTS.USER.UPDATE:
      userState = Object.assign({}, state, action.payload);
      break;
    case FOX_CONSTANTS.USER.LOGOUT:
      userState = initialUserState;
      break;
    default:
      userState = state;
      break;
  }

  return userState;
}