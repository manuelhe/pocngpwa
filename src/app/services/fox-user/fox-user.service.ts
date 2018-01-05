import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { FoxUserModel } from '../../models/fox-user/fox-user.model';
import { globals } from '_constants';
import { FOX_CONSTANTS } from 'app/reducers/common/fox-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AWSService } from 'app/services/aws/aws.service';
import { TrackingInformationService } from '../common/tracking-information.service';

import 'rxjs/add/operator/map';

@Injectable()
export class FoxUserService {
  private userStore: Observable<FoxUserModel>;
  private userToken: string;
  private loginTries: number = globals.loginTries;
  private loginAttempts = 0;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>,
    private trackingService: TrackingInformationService,
    private fngAws: AWSService
  ) {
    this.userStore = store.select((str) => str.user);
    //this.initializeUser();
    this.checkSSO();
  }

  private doApiCall(apiUrl, callback, data = {}) {
    try {
      const x = new XMLHttpRequest();
      x.open('GET', apiUrl, true);
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      x.setRequestHeader('Content-type', 'application/json');
      x.setRequestHeader('cache', 'false');
      x.withCredentials = true;
      x.onreadystatechange = function () {
        x.readyState > 3 && callback && callback(x.responseText, x);
      };
      x.send(data);
    } catch (e) {
      window.console && console.log(e);
    }
  };

  private checkSSO(): void {
    let ssoEvToken = localStorage.getItem('sso_evgnt_token');
    let ssoEvUser = localStorage.getItem('sso_evgnt_user');

    // Get token from tbox
    this.doApiCall(globals.foxToolBoxStatusEP, (res) => {
      res = JSON.parse(res);

      if (res.status) {
        if (ssoEvToken && ssoEvUser) {
          this.loadEvUser({userToken: res.user_token}, false);
        } else {
          this.loadEvUser({userToken: res.user_token}, true);
        }
      } else {
        this
          .route
          .queryParams
          .take(1)
          .subscribe((params) => {
            //console.log("rutas");
            //console.log(params);
            if (params['userToken']) {
              this.loadEvUser(params, true);
            } else {
              ssoEvToken = localStorage.getItem('sso_evgnt_token');
              ssoEvUser = localStorage.getItem('sso_evgnt_user');

              // If evergent token exists
              if (ssoEvToken && ssoEvToken !== '') {
                // Just load the current user
                this.loadEvUser({userToken: ssoEvToken}, false);
              } else {
                const excludeParamsKeys = [
                  'logout_status'
                ];
                const emptyUser = this.initializeUser();
                emptyUser.loggedin = false;
                emptyUser.loading = false;
                this.setCurrentUser(emptyUser);
                this.cleanUrl(excludeParamsKeys);
              }
            }
          });
      }
    });
  }

  private initializeUser(): any {
    const initialUser: FoxUserModel = {
      loggedin: false,
      loading: true,
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

    this.setCurrentUser(initialUser);
    return initialUser;
  }

  private loadEvUser(params, justLogged): void {
    const apiUrl = `${globals.getEvApiEndPoint('getCustomerDetails')}?cpid=FOX&userToken=${params['userToken']}`;

    const excludeParamsKeys = [
      'app',
      'ev_user_token',
      'state',
      'version_id',
      'userToken',
      'show_profile',
      'login',
      'logout_status'
    ];

    let userObj = {
      loggedin: false,
      loading: true,
      justLogged: justLogged,
      token: params['userToken'],
      rawUser: null
    };

    // Count attempts to login
    this.loginAttempts++;

    this
      .http
      .get(apiUrl)
      .map((res: Response) => {
        return res.json();
      })
      .subscribe(
        (user) => {
          if (user.main.profile) {
            userObj = {
              loggedin: true,
              loading: false,
              justLogged: justLogged,
              token: params['userToken'],
              rawUser: user.main
            };

            const cableProviderApiUrl = globals.getCableProviderApi(userObj.rawUser.country.isoCode);

            this.http
            .get(cableProviderApiUrl)
            .map((res: Response) => {
              return res.json().entries;
            })
            .subscribe(cableProviders => {
              let provider = cableProviders.find(cp => cp.short_name == userObj.rawUser.identityProvider.referenceID);
              userObj.rawUser.cableProvider = provider;

              this.fngAws.trackUserAccessLogin(userObj);

              // Track user logged
              if (justLogged) { // Solo enviar el evento identify cuando el user recien se loguea
                // Multiples ceros enviados en el identity. Pedido en FOXS-6970
                this.trackingService.identifySegmentEvent(userObj, '00000000');
              }

              this.trackingService.pushDataLayer({
                'event': 'trackLogin',
                'accountType': user.main.subscriptionTypeID,
                'subAccountID': user.main.id,
                'cableOperator': user.main.identityProvider.description
              });

              this.setCurrentUser(userObj);
              this.saveCurrentUser(userObj);
              this.cleanUrl(excludeParamsKeys);
            }, (error) => {
              userObj.rawUser.cableProvider = null;
              this.fngAws.trackUserAccessLogin(userObj);

              // Track user logged
              if (justLogged) { // Solo enviar el evento identify cuando el user recien se loguea
                // Multiples ceros enviados en el identity. Pedido en FOXS-6970
                this.trackingService.identifySegmentEvent(userObj, '00000000');
              }

              this.trackingService.pushDataLayer({
                'event': 'trackLogin',
                'accountType': user.main.subscriptionTypeID,
                'subAccountID': user.main.id,
                'cableOperator': user.main.identityProvider.description
              });

              this.setCurrentUser(userObj);
              this.saveCurrentUser(userObj);
              this.cleanUrl(excludeParamsKeys);
            });
          } else if (user.main.failureMessage) {
            if (this.loginAttempts === this.loginTries) {
              userObj = {
                loggedin: false,
                loading: false,
                justLogged: false,
                token: params['userToken'],
                rawUser: null
              };

              this.setCurrentUser(userObj);
              this.saveCurrentUser(userObj);
              this.cleanUrl(excludeParamsKeys);
              this.handleError(user.main.failureMessage);
            } else {
              this.loadEvUser(params, justLogged);
            }

            this.setCurrentUser(userObj);
            this.saveCurrentUser(userObj);
            this.cleanUrl(excludeParamsKeys);
          } else {
            const getUserApiUrl = `${globals.getEvApiEndPoint('getUser')}?cpid=FOX&userToken=${params['userToken']}`;

            this
              .http
              .get(getUserApiUrl)
              .map((res: Response) => {
                return res.json();
              })
              .subscribe((res) => {
                if (!res.GetUserResponseMessage.failureMessage) {
                  this.loadEvUser(params, justLogged);
                }
              });

            this.setCurrentUser(userObj);
            this.saveCurrentUser(userObj);
            this.cleanUrl(excludeParamsKeys);
          }
        },
        (error) => {
          if (this.loginAttempts === this.loginTries) {
            userObj = {
              loggedin: false,
              loading: false,
              justLogged: false,
              token: params['userToken'],
              rawUser: null
            };

            this.setCurrentUser(userObj);
            this.saveCurrentUser(userObj);
            this.cleanUrl(excludeParamsKeys);

            this.handleError(error);
          } else {
            this.loadEvUser(params, justLogged);
          }
        }
      );
  }

  public getLoginAttempts(): number {
    return this.loginAttempts;
  }

  public getLoginAttemptsReached(): boolean {
    return this.loginAttempts == this.loginTries;
  }

  private cleanUrl(excludeParams = []): void {
    this
      .route
      .queryParams
      .subscribe((params) => {
        const paramsKeys = excludeParams;
        const finalParams = {};

        params = Object.keys(params).map((key) => { return {key: key, value: params[key]}; });
        params = params.filter((param) => {
          return !paramsKeys.includes(param.key);
        });

        params.map((param) => {
          finalParams[param.key] = param.value;
        });

        this.router.navigate([document.location.pathname], {queryParams: finalParams});
      });
  }

  public getUser(): Observable<FoxUserModel> {
    return this.userStore;
  }

  public setCurrentUser(user: any): void {
    this.store.dispatch({type: FOX_CONSTANTS.USER.UPDATE, payload: user});
  }

  public saveCurrentUser(user: any): void {
    localStorage.setItem('sso_evgnt_token', user.token);
    localStorage.setItem('sso_evgnt_user', JSON.stringify(user));
  }

  private handleError(error) {
    console.log('Some error ocurred: --->', error);
  }

  public logout(redirect = `${document.location.origin}`): void {
    this.getUser().subscribe((user) => {
      localStorage.removeItem('sso_evgnt_token');
      localStorage.removeItem('sso_evgnt_user');
      if (user.loggedin) { // Previene llamadas multiples cuando el store se actualiza
        this.fngAws.trackUserAccessLogout(user);

        if (localStorage.getItem('trackLogout')) {
          this.trackingService.trackSegmentEvent('logout', {
            userId: localStorage.getItem('trackLogout')
          });
          this.trackingService.resetSegmentIdentity();
          localStorage.removeItem('trackLogout');
        }
      }
      // this.store.dispatch({type: FOX_CONSTANTS.USER.LOGOUT});
      document.location.href = globals.getLogoutUrl(redirect, user.rawUser.country.isoCode, user.token);
    }).unsubscribe();
  }
}
