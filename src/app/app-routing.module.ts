import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { HeroResolver } from './core/resolvers/hero.resolver';
import { DetailComponent } from './components/detail/detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SingleHeroResolver } from './core/resolvers/single-hero.resolver';


const routes: Routes = [
  {
    path: 'home',
    component: ListComponent,
    pathMatch: 'full',
    resolve: {
      hero: HeroResolver
    }
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    pathMatch: 'full',
    resolve: {
      heroDetails: SingleHeroResolver
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    path: '**', //Wildcard
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
