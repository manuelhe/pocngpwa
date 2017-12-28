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
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './reducer.factory';
import { ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HeaderComponent,
    FooterComponent,
    NewsItemComponent,
    NewsDetailComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    ROUTING,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers),
    HttpClientModule
  ],
  providers: [MsgService,ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
