import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StreamEventModel } from 'app/models/fox-live/stream-event.model';

@Injectable()
export class SchemaOrgService {
  constructor(){}

  public sendSchemaDetails(event: StreamEventModel){
    let data;

    if(event.isChannel) {
      //it's a channel
      data = this.getChannelData(event);
    } else if (this.isTeamEvent(event)){
      //it's a sports match with teams
      data = this.getSportsEventData(event);
    } else if(this.isShow(event)){
      //it's a show event
      data = this.getShowData(event);
    } else {
      //it's another event
      data = this.getNoTeamEventData(event);
    }
    
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(data);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  private isTeamEvent(event: StreamEventModel): boolean{
    return ( event.title.indexOf(" VS ") !== -1 || event.title.indexOf(" VS. ") !== -1 );
  }

  private getTeams(event: StreamEventModel): any{
    if(!this.isTeamEvent(event)){
      console.log("event must be a teams event");
      return;
    }

    if(event.title.indexOf(" VS ") !== -1){
      return event.title.split(" VS ");
    } else {
      //los teams estan en formato con VS.
      return event.title.split(" VS. ");
    }    
  }

  private isShow(event: StreamEventModel): boolean{
    return (!event.label || event.label.trim().length === 0 || event.label.trim().toLowerCase().indexOf("show") !== -1); 
  }

  private toIsoDate(numberDate: number):string{
    const realDate = new Date(numberDate * 1000);
    return realDate.toISOString();
  }

  private getSportsEventData(event: StreamEventModel){
    const teams = this.getTeams(event);
    const localTeam = teams[0];
    const visitorTeam = teams[1];

    return {
      "@context":"http://schema.org",
      "@type":"BroadcastEvent",
      "name":	event.title,	
      "description":	"En	vivo " + event.label + event.title,
      "isLiveBroadcast": "http://schema.org/True",
      "videoFormat": "HD",
      "startDate": this.toIsoDate(event.startDate),
      "broadcastOfEvent": {
        "@type":	"SportsEvent",
        "name": event.title,
        "description":	"En	vivo	" + event.title,	
        "image": event.image.url,	
        "startDate": this.toIsoDate(event.startDate),
        "endDate": this.toIsoDate(event.endDate),	
        "competitor": [
          {
            "@type": "SportsTeam",
            "name": localTeam
          },
          {
            "@type": "SportsTeam",
            "name": visitorTeam
          }
        ],
        "location":{
          "@type":"Place",	
          "name":"Fox	Sports En Vivo",
          "address":"https://play.foxsportsla.com/stream?evid=" + event.id
        }
      }
    };
  }

  private getNoTeamEventData(event: StreamEventModel): any{
    return {
      "@context":"http://schema.org",
      "@type":"BroadcastEvent",
      "name":	event.title,	
      "description":	"En	vivo " + event.label + event.title,
      "isLiveBroadcast":	"http://schema.org/True",	
      "videoFormat":	"HD",
      "startDate": this.toIsoDate(event.startDate),	
      "broadcastOfEvent":	{
        "@type":	"SportsEvent",
        "name": event.title,
        "description":	"En	vivo	" + event.title,	
        "image": event.image.url,	
        "startDate": this.toIsoDate(event.startDate),
        "endDate": this.toIsoDate(event.endDate),	
        "location":{
          "@type":"Place",	
          "name":"Fox	Sports En Vivo",
          "address":"https://play.foxsportsla.com/stream?evid=" + event.id
        }	
      }
    };
  }

  private getShowData(event: StreamEventModel): any {
    const seasonNumber = new Date().getFullYear();
    const indexOfMinus = event.title.lastIndexOf("-");

    let seriesName;
    
    if(indexOfMinus !== -1){
      seriesName = event.title.substring(0, indexOfMinus);   
    } else {
      seriesName = event.title;
    }
    

    return {
            "@context":	"http://schema.org",
            "@id": event.id,
            "@type": "TVEpisode",
            "name": event.title,
            "episodeNumber": "no	definido",
            "partOfSeason":	{
                "@type": "TVSeason",
                "seasonNumber": seasonNumber
            },
            "partOfSeries":	{
                "@type": "TVSeries",
                "name":	seriesName,
                "sameAs":	"https://www.foxsports.com/show/" + event.id
            },
            "releasedEvent":	{
                "@type": "PublicationEvent",
                "startDate": this.toIsoDate(event.startDate)
            },
            "potentialAction":	[
                {
                  "@type": "WatchAction",
                  "target":	{
                    "@type": "EntryPoint",
                    "urlTemplate": "https://play.foxsportsla.com/streaming?evid=" + event.id,
                    "inLanguage":	"en",
                    "actionPlatform":	["http://schema.org/DesktopWebPlatform"]
                  },
                  "expectsAcceptanceOf":	[
                    {
                      "@type": "Offer",
                      "category":	"externalSubscription",
                      "availabilityStarts":	this.toIsoDate(event.startDate),
                      "availabilityEnds":	this.toIsoDate(event.endDate),
                      "seller":	{
                          "@type": "Organization",
                          "name": "FOX"
                      }
                    }
                  ]
                }
            ],
            "image": [event.image.url],
            "description": "En	vivo " + event.label + event.title,
            "url": "https://play.foxsportsla.com/streaming?evid=" + event.id
        };
  }

  private getChannelData(event: StreamEventModel): any {
    return {
      "@context":"http://schema.org",	
      "@type":"TelevisionChannel",
      "name": event.channel_info.display_name,	
      "broadcastChannelId":event.channel,	
      "broadcastServiceTier":event.authLevel,
      "providesBroadcastService":{
        "@type":"BroadcastService",
        "name": event.channel_info.display_name,	
        "broadcastDisplayName":	event.channel_info.display_name,	
        "broadcastAffiliateOf":{
          "@type":"Organization",
          "name":"Fox	Network	Group"	
        }
      }	
    };
  }
}


