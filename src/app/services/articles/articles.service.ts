import { Injectable } from '@angular/core';
import { News } from '../../models/news';

@Injectable()
export class ArticlesService {

  
  constructor() { }

  public getArticles() {

    let o1 = new News();
    o1.description = "asd";
    o1.id=2222;
    o1.title="iaojsdioasjdoasjdoasd";
    o1.description="deadaedaedaede";
    o1.pictureUrl="asdasdasdasdas";
    o1.tagName = "asda";
    o1.webUrl="asdasdasdas";
    
    return [
       o1,
       o1,
       o1
      ];
  }

}
