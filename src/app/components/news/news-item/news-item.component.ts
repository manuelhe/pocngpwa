import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/articles/article.model';

@Component({
  selector: 'fox-news-item',
  templateUrl:'./news-item-component.html',
  styleUrls: ['./news-item-component.scss']
})

export class NewsItemComponent implements OnInit {

  @Input() data: Article;

  constructor() { }

  ngOnInit() {
  }

}
