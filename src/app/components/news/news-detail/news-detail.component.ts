import { Component, OnInit, Input  } from '@angular/core';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Article } from '../../../models/articles/article.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SeoService } from '../../../services/seo/seo.service';


@Component({
  selector: 'app-new-detail',
  templateUrl:'./news-detail-component.html',
  styleUrls: ['./news-detail-component.scss']
})

export class NewsDetailComponent implements OnInit {

  data:Article;
  schema:any;

 constructor(
   private articlesService: ArticlesService,
   private route: ActivatedRoute,
   private seo: SeoService
  ) {
    this.route.params.subscribe(params => {
 
       this.articlesService.getArticle(params.id)
        .first(a => a != null)
        .subscribe(st => {
          this.data = st;
          this.setSeoData(this.data);
          this.setNgLd(this.data);
        });   

    });
  }
  private setSeoData(data:Article) {
    this.seo.setTitle(data.title);
    this.seo.setDescription(data.description);
    this.seo.setOgTitle(data.title);
    this.seo.setOgDescription(data.description);
    this.seo.setOgImage(data.pictureUrl);
    this.seo.setTwitterTitle(data.title);
    this.seo.setTwitterDescription(data.description);
    this.seo.setTwitterImage(data.pictureUrl);
  }

  private setNgLd(data:Article) {
  this.schema = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    'name': data.title,
    'url': data.webUrl
  };
 }
 

  ngOnInit() { }

}
