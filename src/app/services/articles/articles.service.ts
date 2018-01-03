import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Article } from '../../models/articles/article.model';
import { AppStore } from '../../app.store';
import { ArticlesLoad } from '../../actions/article.actions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticlesService {
  public articles: Observable<Article[]>;

  constructor(
    private store:Store<AppStore>,
    private http:HttpClient
  ){
      this.articles = this.store.select(str => str.article);
      this.loadArticles();
  }
  private loadArticles() {
    this.http.get('https://fsappcore.foxsportsla.com/api/news?lang=es&country=gt&pagination-way=down&sport-category=')
    .subscribe(data => {
      this.setArticles(data['entries'].map(item => {
        return {
          id: item.id,
          title: item.title,
          webUrl: item['web-url'],
          pictureUrl: item['picture-url'],
          tagName: item['tag-name'],
          description: item.description,
          date: item.date
        }
      }));
    });
  }
  private setArticles(articles:Article[]) {
    this.store.dispatch(new ArticlesLoad(articles));
  }

  /**
   * getArticles
   */
  public getArticles():Observable<Article[]> {
    return this.articles;
  }

  public getArticle(id:number):Observable<Article> {
    return this.articles.first(a => a != null)
      .map(art =>{
        let selected = art.filter(item => item.id == id);
        return (selected.length > 0) ? selected[0] : null;
      });
  }

}
