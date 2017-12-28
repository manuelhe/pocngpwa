import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArticlesService } from '../../services/articles/articles.service';
import { Article } from '../../models/articles/article.model';

@Component({
  selector: 'fox-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  
  public news:Observable<Article>;

  constructor(public articlesService: ArticlesService) {
    this.news = this.articlesService.getArticles();
   }

  ngOnInit() { }
}