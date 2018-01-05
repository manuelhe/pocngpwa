import { Action } from '@ngrx/store';
import { FOX_CONSTANTS } from '../reducers/common/fox-constants';
import { FoxUserModel } from '../models/fox-user/fox-user.model';

export class UserUpdate implements Action {
    type = FOX_CONSTANTS.USER.UPDATE;
    constructor(public payload: FoxUserModel) {}
}
export class UserLogout implements Action {
    type = FOX_CONSTANTS.USER.LOGOUT;
    constructor(public payload: FoxUserModel) {}
}

export type UserActions = UserUpdate | UserLogout