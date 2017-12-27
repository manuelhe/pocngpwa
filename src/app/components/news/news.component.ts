import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { News } from '../../models/news';

@Component({
  selector: 'fox-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  
  public news:News[];

  constructor() {}

  ngOnInit() {
    //this.news = this.articleService.getArticles();
  }
}