import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { StreamConfigurationService } from '../../../services/fox-streaming/stream-configuration.service';
import { StreamConfigurationModel } from '../../../models/fox-streaming/stream-configuration.model';

import { FoxEventService } from '../../../services/fox-event/fox-event.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StreamEventModel } from '../../../models/fox-live/stream-event.model';
import { FoxUserService } from '../../../services/fox-user/fox-user.service';
import { FoxUserModel } from '../../../models/fox-user/fox-user.model';
import { MobileInfoService } from '../../../services/common/mobile-info.service';
import { BasicActionsService } from '../../../services/common/basic-actions.service';
import { TrackingInformationService } from '../../../services/common/tracking-information.service';
import { SeoService } from '../../../services/seo/seo.service';
import { DOCUMENT } from '@angular/platform-browser';
import { SchemaOrgService } from 'app/services/schemaorg/schemaorg.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

declare const $pdk: any;

@Component({
  selector: 'fox-streaming-now',
  templateUrl: './fox-streaming-now.component.html',
  styleUrls: ['./fox-streaming-now.component.scss']
})
export class FoxStreamingNowComponent implements OnDestroy, OnInit {
  public pageLoading: boolean;
  public streamConfiguration: Observable<StreamConfigurationModel>;

  private eventsLive: Array<any>;

  private slug: any;
  private event: StreamEventModel;
  private user: FoxUserModel;

  private showErrorMessage: boolean;

  public loadingEvent: string;

  private routeSubscription: Subscription;

  constructor (
    private streamConfigurationService: StreamConfigurationService,
    @Inject(DOCUMENT) private document,
    private schemaService: SchemaOrgService,
    private seo: SeoService,
    private eventService: FoxEventService,
    private route: ActivatedRoute,
    private userService: FoxUserService,
    private mobileInfoService: MobileInfoService,
    private basicActionsService: BasicActionsService,
    private trackingService: TrackingInformationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageLoading = true;

    this.streamConfiguration = this.streamConfigurationService.getStreamConfiguration();

    this.loadUserAndParams();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe( params => {
      this.slug = params.slug;
      this.loadUserAndParams()
    })
  }

  private loadUserAndParams(): void {
    if (!this.slug) {
      return;
    }
    if (this.mobileInfoService.isMobile()) {
      // Accediendo desde mobile, redirigir
      this.router.navigate(['mobile-app', this.slug]);
    } else {
      this.userService.getUser()
        .first(user => user != null)
        .subscribe((user) => {
          this.trackingService.pageSegmentEvent('streaming');
          this.user = user;
          this.loadLiveEvents();
      });
    }
  }

  private loadLiveEvents(): void {
    //console.log("loadliveevents");
    this.eventService.getAllLiveEventsWithChannels(0, 300).first(liveEvents => liveEvents != null).subscribe((liveEvents) => {
      //console.log("event with channels subs");
      this.eventsLive = Object.keys(liveEvents).map((key) => liveEvents[key]);

      // Seleccionar el evento de los eventos en vivo
      this.event = this.eventsLive.find((ev) => ev.slug === this.slug);

      // Filtrar el evento de la lista de eventos en vivo
      this.eventsLive = this.eventsLive.filter((ev) => ev.slug !== this.slug);

      if (this.event) {
        this.setSEOTags(this.event);
        this.loadUserPermissions();
      } else {
        // El evento no esta en vivo o es un canal y tiene un evento asociado
        this.loadNonLiveEvents();
      }

    });
  }

private loadNonLiveEvents(): void {
    this.eventService.getAll(0, 300)
      .first(events => events != null)
      .subscribe((events) => {
      if (events) {
        const nextEvents = Object.keys(events).map((key) => events[key]);

        // Busca el evento en la lista de proximos eventos
        this.event = nextEvents.find((ev) => ev.slug === this.slug);

        if (this.event) {
          this.setSEOTags(this.event);

          // Evento encontrado, revisar horarios
          const evStartDate = new Date(this.event.startDate * 1000);
          const evEndDate = new Date(this.event.endDate * 1000);
          const now = new Date();

          if (evStartDate.getTime() > now.getTime()) {
            // Evento no iniciado aun. Mostrar countdown
            this.streamConfigurationService.loadError(this.streamConfigurationService.systemErrors.COUNTDOWN,
              this.event);
          } else if (evEndDate.getTime() < now.getTime()) {
            // Evento ya termino. Verificar si es digital o comun
            if (this.event.channel_info.logo_picture.length > 0) {
              // Evento comun
              this.streamConfigurationService.loadError(this.streamConfigurationService.systemErrors.AFTEREVENT,
                this.event);
            } else {
              // Evento digital
              this.streamConfigurationService.loadError(this.streamConfigurationService.systemErrors.AFTEREVENTDIGITAL,
                this.event);
            }
          } else {
            // El evento aun no termino y aun no ha iniciado, esta en vivo, caso no real. Error Generico
            this.streamConfigurationService.loadError(this.streamConfigurationService.systemErrors.GENERIC,
              this.event);
          }

          this.pageLoading = false;
          this.loadingEvent = null;
        } else {
          // El id de evento es un canal que tiene actualmente un evento asociado
          this.eventService.getChannels().subscribe((channels) => {
            if (channels) {
              channels = Object.keys(channels).map(key => channels[key]);
              const chnl = channels.find((ch, chi) => { return this.slug === ch.slug; });
              if (chnl) {
                this.event = this.eventService.convertChannelIntoEvent(chnl);

                this.setSEOTags(this.event);

                this.loadUserPermissions();
              } else {
                // El evento no existe, no es un canal o no esta listado actualmente para su ubicacion
                this.streamConfigurationService.loadError(this.streamConfigurationService.systemErrors.GENERIC, this.event);
                this.pageLoading = false;
                this.loadingEvent = null;
              }
            }
          });
        }
      }
    });
  }

  private loadUserPermissions(): void {
    this.eventService.getAuthorizationLevel(this.user.rawUser, this.event)
    .first(auth => auth != null)
    .subscribe((auth) => {
      //console.log("auth lvl subs");

      if (this.event.externalEvent === 'turner') {
        // Evento de Turner, redirect
        this.streamConfigurationService.loadError(
          this.streamConfigurationService.systemErrors.EXTERNALEVENT, this.event);
      } else if (auth.status === 'allow') {
        // Continuar
        this.streamConfigurationService.loadPlayer(this.event, auth);
      } else {
        // Usuario bloqueado
        if (!this.user.loggedin) {
          // User existe pero no esta logueado
          if (this.userService.getLoginAttempts() > 1 && this.userService.getLoginAttemptsReached()) {
            this.streamConfigurationService.loadError(
              this.streamConfigurationService.systemErrors.ERRORINUSERLOGIN, this.event);
          } else {
            this.streamConfigurationService.loadError(
              this.streamConfigurationService.systemErrors.USERSHOULDLOGIN, this.event);
          }
        } else if (this.user.loggedin && this.event.authLevel !== 'premium') {
          // User bloqueado pero si logueado. Evento no premium. Fallback de permisos basicos
          this.streamConfigurationService.loadError(
            this.streamConfigurationService.systemErrors.ACCESSDENIED, this.event);
        } else if (this.user.rawUser && this.event.authLevel === 'premium') {
          // User no es premium, no tiene permisos para verlo
          this.streamConfigurationService.loadError(
            this.streamConfigurationService.systemErrors.USERNOTPREMIUM, this.event);
        } else {
          // Usuario bloqueado, si logueado, con acceso al evento
          // Continuar
          this.streamConfigurationService.loadError(
            this.streamConfigurationService.systemErrors.GENERIC, this.event);
        }
      }
      this.pageLoading = false;
      this.loadingEvent = null;
    },
    (error) => {
      // Error en el servicio de auth
      this.streamConfigurationService.loadError(
        this.streamConfigurationService.systemErrors.ERRORAUTH, this.event);
      this.pageLoading = false;
      this.loadingEvent = null;
    });
  }

  public playEvent(event) {
    this.loadingEvent = event.id;
    this.basicActionsService.playEvent(event);
  }

  public closeErrorMessage(): void {
    this.showErrorMessage = false;
  }

  public setSEOTags(event: StreamEventModel): void{
    //schema.org
    this.schemaService.sendSchemaDetails(event);

    this.seo.setTitle(event.title);
    this.seo.setOgTitle(event.title);
    this.seo.setTwitterTitle(event.title);

    this.seo.setDescription('Disfruta EN VIVO de las mejores competencias del mundo y de todos nuestros programas');
    this.seo.setOgDescription('Disfruta EN VIVO de las mejores competencias del mundo y de todos nuestros programas');
    this.seo.setTwitterDescription('Disfruta EN VIVO de las mejores competencias del mundo y de todos nuestros programas');

    let image;
    if (event.image.url.startsWith('http') || event.image.url.startsWith('https')){
      image = event.image.url;
    } else {
      image = this.document.location.origin + event.image.url;
    }
    this.seo.setOgImage(image);
    this.seo.setTwitterImage(image);

    this.seo.setOgUrl(this.document.location.href);
    this.seo.setTwitterUrl(this.document.location.href);

    // Falta definir la descripcion en el objeto evento
    /*
    this.seo.setDescription(event.description);
    this.seo.setOgDescription(event.description);
    this.seo.setTwitterDescription(event.description);
    */
  }
}
