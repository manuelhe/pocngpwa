import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../../models/news';

@Component({
  selector: 'fox-news-item',
  templateUrl:'./news-item-component.html',
  styleUrls: ['./news-item-component.scss']
})

export class NewsItemComponent implements OnInit {

  @Input() data: News;

  constructor() { }

  ngOnInit() {
  }

}
