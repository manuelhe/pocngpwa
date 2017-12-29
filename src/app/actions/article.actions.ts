import { Action } from '@ngrx/store';
import { Article } from '../models/articles/article.model';

export const ArticleActionTypes = {
  LOAD_ARTICLES: '[Articles] load'
};

export class ArticlesLoad implements Action {
    type = ArticleActionTypes.LOAD_ARTICLES;

    constructor(public payload: Article[]) {}
}

export type ArticleActions = ArticlesLoad