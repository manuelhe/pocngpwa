import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store/src/store';
import { Article } from '../../models/articles/article.model';
import { AppStore } from '../../app.store';
import { HttpClient } from '@angular/common/http';
import * as articles from '../../actions/article.actions';
import { ArticlesLoad } from '../../actions/article.actions';

@Injectable()
export class ArticlesService {
  public articles: Observable<Article>;

  constructor(
    private store:Store<AppStore>,
    private http:HttpClient){
      this.articles = store.select(str => str.article);
      this.loadArticles();
  }
  private loadArticles() {
    this.http.get('https://fsappcore.foxsportsla.com/api/news?lang=es&country=gt&pagination-way=down&sport-category=')
    .subscribe(data => {
      console.log(data);
      //data.entries;
    });
  }
  private setArticles(articles:any) {
    this.store.dispatch(new ArticlesLoad(articles));
  }

  /**
   * getArticles
   */
  public getArticles() {
    return this.articles;
  }

}
