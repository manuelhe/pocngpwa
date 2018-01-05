import { Component, OnInit } from '@angular/core';
import { SeoService } from 'app/services/seo/seo.service';

@Component({
  selector: 'fox-streaming',
  templateUrl: './fox-streaming.component.html',
  styleUrls: ['./fox-streaming.component.scss']
})
export class FoxStreamingComponent implements OnInit {
  constructor(private seo: SeoService) {
    seo.setTitle("evento interno");
    seo.setDescription("desc interna  ");
    seo.setOgTitle("titulo facebook");
    seo.setOgType("article");
    seo.setOgUrl("https://play.foxsportsla.com/streaming/1");
    seo.setOgImage("https://play.foxsportsla.com/assets/images/foxsports.png");
  }

  ngOnInit() {}
}
