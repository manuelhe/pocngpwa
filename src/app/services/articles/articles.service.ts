import { Injectable } from '@angular/core';
import { News } from '../../models/news';

@Injectable()
export class ArticlesService {

  
  constructor() { }

  public getArticles() {

    let o1 = new News();
    o1.description = "asd";
    o1.id=2222;
    o1.title="Liverpool oficializó a Virgil van Dijk y pagaría... ¡100 millones de dólares!";
    o1.description="Los 'Reds' confirmaron la adquisición del defensa neerlandés procedente del Southampton";
    o1.pictureUrl="http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/Virgil-van-Dijk-Liverpool-271217.jpg";
    o1.tagName = "Premier League";
    o1.webUrl= "http://www.foxsports.com.gt/news/337214?origin=app";
    
    return [
       o1,
       o1,
       o1
      ];
  }

}
