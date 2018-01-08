import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MsgService } from './services/msg.service';
import { ArticlesService  } from './services/articles/articles.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { NewsDetailComponent } from './components/news/news-detail/news-detail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './reducer.factory';
import { ROUTING } from './app.routes';
import { SeoService } from './services/seo/seo.service';
import { NgxJsonLdModule } from 'ngx-json-ld';

import { FoxLiveComponent } from './components/fox-live/fox-live.component';
import { FoxDFPAdComponent } from './components/commons/fox-dfp-ad/fox-dfp-ad.component';
import { KSSwiperModule } from '../assets/libs/ks-swiper/dist';
import { FoxSingleEventComponent } from './components/commons/fox-single-event/fox-single-event.component';
import { FoxEventStripComponent } from './components/commons/fox-event-strip/fox-event-strip.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SafeHtmlPipe } from './pipes/safe-html-pipe';
import { ResizePipe } from './pipes/resize.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FoxChannelComponent } from './components/commons/fox-single-event/fox-channel/fox-channel.component';
import { FoxEventDetailsComponent } from './components/commons/fox-single-event/fox-event-details/fox-event-details.component';
import { FoxBtnGetPlayerComponent } from './components/commons/fox-single-event/fox-btn-get-player/fox-btn-get-player.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { HttpModule } from '@angular/http';
import { BasicActionsService } from './services/common/basic-actions.service';
import { TrackingInformationService } from './services/common/tracking-information.service';
import { MobileInfoService } from './services/common/mobile-info.service';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { FoxEventService } from './services/fox-event/fox-event.service';
import { FoxUserService } from './services/fox-user/fox-user.service';
import { AWSService } from './services/aws/aws.service';
import { FoxLoginModalComponent } from './components/commons/fox-modal/fox-login-modal/fox-login-modal.component';
import { FoxFooterComponent } from './components/commons/fox-footer/fox-footer.component';
import { FoxModalComponent } from './components/commons/fox-modal/fox-modal.component';
import { FoxHeaderNavigationComponent } from './components/commons/fox-header-navigation/fox-header-navigation.component';
import { FoxLogoutComponent } from './components/fox-logout/fox-logout.component';
import { FoxMobileAppComponent } from './components/fox-mobile-app/fox-mobile-app.component';
import { FoxProgrammingComponent } from './components/fox-programming/fox-programming.component';
import { FoxStreamingComponent } from './components/fox-streaming/fox-streaming.component';
import { FoxHostedSolution } from './components/fox-streaming/fox-hosted-solution/fox-hosted-solution.component';
import { FoxStreamingInformationComponent } from './components/fox-streaming/fox-streaming-information/fox-streaming-information.component';
import { FoxStreamingNowComponent } from './components/fox-streaming/fox-streaming-now/fox-streaming-now.component';
import { FoxPlayerComponent } from './components/fox-streaming/fox-streaming-now/fox-player/fox-player.component';

// External
import { ModalModule, PopoverModule } from 'ngx-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HeaderComponent,
    FooterComponent,
    NewsItemComponent,
    NewsDetailComponent,
    NotfoundComponent,

    FoxLiveComponent,
    FoxDFPAdComponent,
    FoxSingleEventComponent,
    FoxEventStripComponent,
    FoxChannelComponent,
    FoxEventDetailsComponent,
    FoxBtnGetPlayerComponent,
    FoxLoginModalComponent,
    FoxFooterComponent,
    FoxHeaderNavigationComponent,
    FoxModalComponent,
    FoxLogoutComponent,
    FoxMobileAppComponent,
    FoxProgrammingComponent,
    FoxStreamingComponent,
    FoxHostedSolution,
    FoxStreamingInformationComponent,
    FoxStreamingNowComponent,
    FoxPlayerComponent,

    SafeUrlPipe,
    SafeHtmlPipe,
    ResizePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    ROUTING,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers),
    HttpClientModule,
    //HttpClient,
    HttpModule,
    NgxJsonLdModule.forRoot(),
    KSSwiperModule,
    LazyLoadImageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng2DeviceDetectorModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    Angular2FontawesomeModule,
    PerfectScrollbarModule  
  ],
  providers: [
    MsgService,
    ArticlesService,
    SeoService,
    GeolocationService,
    BasicActionsService,
    TrackingInformationService,
    MobileInfoService,
    FoxEventService,
    FoxUserService,
    AWSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
