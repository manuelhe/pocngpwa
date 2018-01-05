import {Action} from '@ngrx/store';

export function createAction(type, payload?) {
  return { type, payload };
}
