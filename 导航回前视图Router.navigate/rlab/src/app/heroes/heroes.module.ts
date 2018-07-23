import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroListComponent} from './hero-list/hero-list.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesRoutingModule} from './heroes-routing/heroes-routing.module';
import {FormsModule} from '@angular/forms';
import {HeroService} from './hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [HeroService]
})
export class HeroesModule {
}
