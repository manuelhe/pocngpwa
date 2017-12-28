import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Article } from '../../models/articles/article.model';
import { AppStore } from '../../app.store';
import { ArticlesLoad } from '../../actions/article.actions';
import { HttpClient } from '@angular/common/http';
import { News } from '../../models/news';

@Injectable()
export class ArticlesService {
  public articles: Observable<Article>;

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
  public getArticles():Observable<Article> {
    return this.articles;
  }

  public getArticle():News {
    let n = new News();
    n.date = new Date();
    n.description = "Mano a mano entre Barcelona y Real Madrid por Arthur";
    n.id = 22333;
    n.pictureUrl = "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/Vincenzo-Montella-281217.jpg";
    n.tagName = "La Liga";
    n.title = "Mano a mano entre Barcelona y Real Madrid por Arthur";
    n.webUrl = "www.google.com";
    return n;
  }

}
