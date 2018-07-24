import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroListComponent} from '../hero-list/hero-list.component';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';

/**
 * 路由配置
 */
const heroesRoutes: Routes = [
  { path: 'heroes', redirectTo: '/superheroes' },
  { path: 'hero/:id', redirectTo: '/superhero/:id' },
  { path: 'superheroes',  component: HeroListComponent },
  { path: 'superhero/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {
}
