import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArticlesService } from '../../services/articles/articles.service';
import { Article } from '../../models/articles/article.model';
import { SeoService } from '../../services/seo/seo.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fox-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  
  public news:Observable<Article[]>;

  constructor(private articlesService: ArticlesService,
              private seo: SeoService) {
    this.news = this.articlesService.getArticles();
    this.setSeoData();
   }

   private setSeoData() {
    this.seo.setTitle(environment.seo.title);
    this.seo.setDescription(environment.seo.description);
    this.seo.setOgTitle(environment.seo.ogTitle);
    this.seo.setOgDescription(environment.seo.ogDescription);
    this.seo.setOgImage(environment.seo.ogImage);
    this.seo.setTwitterTitle(environment.seo.twitterTitle);
    this.seo.setTwitterDescription(environment.seo.twitterDescription);
    this.seo.setTwitterImage(environment.seo.twitterImage);
  }

  ngOnInit() { }
}
