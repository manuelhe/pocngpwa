import { Article } from '../../models/articles/article.model';
import * as articles from '../../actions/article.actions';

export function articlesReducer(state:Article, action:articles.ArticleActions):Article {
  switch (action.type) {
    case articles.ArticleActionTypes.LOAD_ARTICLES: {
      return Object.assign([], state, action.payload);
    }
    default: 
      return state;
  }
}
