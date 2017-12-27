import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArticlesService } from '../../services/articles/articles.service';
import { News } from '../../models/news';

@Component({
  selector: 'fox-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  
  public news:News[];

  constructor(private articleService:ArticlesService) {}

  ngOnInit() {
    this.news = this.articleService.getArticles();
  }
}