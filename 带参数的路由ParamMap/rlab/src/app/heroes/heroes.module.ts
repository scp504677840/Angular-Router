import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroListComponent} from './hero-list/hero-list.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesRoutingModule} from './heroes-routing/heroes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ]
})
export class HeroesModule {
}
