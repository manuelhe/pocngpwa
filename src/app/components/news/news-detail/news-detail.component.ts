import { Component, OnInit, Input  } from '@angular/core';
import { News } from '../../../models/news';
import { ArticlesService } from '../../../services/articles/articles.service';

@Component({
  selector: 'app-new-detail',
  templateUrl:'./news-detail-component.html',
  styleUrls: ['./news-detail-component.scss']
})
export class NewsDetailComponent implements OnInit {

 // @Input() data: News;
 data:News;

 constructor(public articlesService: ArticlesService) {
  this.data = this.articlesService.getArticle();
 }

  ngOnInit() {
  }

}
