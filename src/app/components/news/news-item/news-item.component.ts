import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../../models/news';

@Component({
  selector: 'fox-news-item',
  template: `
    <p>
      new-item works!
    </p>
  `,
  styles: []
})
export class NewsItemComponent implements OnInit {

  @Input() data: News;

  constructor() { }

  ngOnInit() {
  }

}
