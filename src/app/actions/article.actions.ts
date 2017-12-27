import { Action } from '@ngrx/store';

export const ArticleActionTypes = {
  LOAD_ARTICLES: '[Articles] load'
};

export class ArticlesLoad implements Action {
    type = ArticleActionTypes.LOAD_ARTICLES;

    constructor(public payload: any) {}
}

export type ArticleActions = ArticlesLoad