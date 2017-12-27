import { Injectable } from '@angular/core';

@Injectable()
export class ArticlesService {

  constructor() { }

  /**
   * getArticles
   */
  public getArticles() {
    return [
        {
          "id": 337150,
          "title": "Los detalles del contrato de Gabriel Peñalba con la UD Las Palmas de Paco Jémez",
          "web-url": "http://www.foxsports.com.gt/news/337150?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/peñalbalaspalmas-261217.jpg",
          "tag-name": "Cruz Azul",
          "description": "El mediocampista de contención ya rescindió su contrato con Cruz Azul",
          "date": "2017-12-27T05:49:00"
        },
        {
          "id": 337149,
          "title": "Ruby Riott venció a Naomi de cara a Royal Rumble",
          "web-url": "http://www.foxsports.com.gt/news/337149?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/riottkick-261217.jpg",
          "tag-name": "wwe",
          "description": "Naomi se distrajo con Liv Morgan y Sarah Logan y Ruby Riott aprovechó para vencerla con la 'Riott Kick'",
          "date": "2017-12-27T04:54:00"
        },
        {
          "id": 337146,
          "title": "¡Que siempre no! Santos regresó a Jefferson Cuero a Monarcas",
          "web-url": "http://www.foxsports.com.gt/news/337146?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/jeffersoncuero-261217.jpg",
          "tag-name": "santos",
          "description": "El colombiano recayó de una lesión de pubis que sufrió con el Morelia",
          "date": "2017-12-27T03:48:00"
        },
        {
          "id": 337142,
          "title": "Llegó el cuarto refuerzo de Pumas para el Clausura 2018",
          "web-url": "http://www.foxsports.com.gt/news/337142?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/luisfuentes-miniCOVER-271217.jpg",
          "tag-name": "futbol",
          "description": "El futbolista ya se presentó en las instalaciones de Cantera para incorporarse a los entrenamientos",
          "date": "2017-12-27T02:59:00"
        },
        {
          "id": 337141,
          "title": "Sampaoli e incidente con policía: \"Fue un hecho menor, una discusión\"",
          "web-url": "http://www.foxsports.com.gt/news/337141?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/sampaolinota.jpg",
          "tag-name": "Universidad de Chile",
          "description": "El técnico se reunió con los hinchas de la U y se refirió al hecho. Además, señaló que espera volver a dirigir el club.",
          "date": "2017-12-27T02:45:00"
        },
        {
          "id": 337140,
          "title": "Tras su paso por el futbol de Costa Rica, Julio Cruz regresa a Rayados",
          "web-url": "http://www.foxsports.com.gt/news/337140?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/juliocruzmty-261217.jpg",
          "tag-name": "futbol",
          "description": "El canterano estará de vuelta en la institución que lo formó como futbolista",
          "date": "2017-12-27T02:03:00"
        },
        {
          "id": 337137,
          "title": "Pachuca confirmó la incorporación de Kekuta Manneh para el Clausura 2018",
          "web-url": "http://www.foxsports.com.gt/news/337137?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/mannehpachuca-261217.jpg",
          "tag-name": "futbol",
          "description": "Los Tuzos se reforzaron en ataque con el delantero estadounidense",
          "date": "2017-12-27T00:48:00"
        },
        {
          "id": 337131,
          "title": "Brady, impresionado y feliz por la gran labor de Garoppolo con los 49ers",
          "web-url": "http://www.foxsports.com.gt/news/337131?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/bradygaroppolo-261217.jpg",
          "tag-name": "Patriots",
          "description": "El exmariscal de campo de los Patriots registró su cuarto triunfo consecutivo son San Francisco",
          "date": "2017-12-26T23:26:00"
        },
        {
          "id": 337126,
          "title": "¡Si no puedes con el enemigo, únete a él! James Harrison firmó con los Patriots",
          "web-url": "http://www.foxsports.com.gt/news/337126?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/harrison-261217.jpg",
          "tag-name": "Patriots",
          "description": "Tres días después de ser cortado por Pittsburgh, el veterano encontró acomodo en New England",
          "date": "2017-12-26T23:06:00"
        },
        {
          "id": 337119,
          "title": "Mexicano adquirió las acciones del Real Murcia de España",
          "web-url": "http://www.foxsports.com.gt/news/337119?origin=app",
          "picture-url": "http://cdn.foxsportsla.com/sites/foxsports-la/files/img/notes/news/Real-Murcia-261217.jpg",
          "tag-name": "Central FOX",
          "description": "El comunicado sobre la venta del equipo de los Pimenteros",
          "date": "2017-12-26T22:14:00"
        }
      ];
  }

}
