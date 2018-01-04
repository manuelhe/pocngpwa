import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailComponent } from './components/news/news-detail/news-detail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


const ROUTES: Routes = [
  {
    path: '',
    component: NewsComponent,
    pathMatch: 'full'
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

export const ROUTING = RouterModule.forRoot(ROUTES);
