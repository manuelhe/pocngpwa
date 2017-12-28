import { AppStore } from './app.store';
import { ActionReducerMap } from '@ngrx/store';
import { articlesReducer } from './reducers/articles/articles.reducer';

export const reducers: ActionReducerMap<AppStore> = {
     article: articlesReducer
};