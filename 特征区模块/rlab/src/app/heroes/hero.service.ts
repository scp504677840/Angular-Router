import {Injectable} from '@angular/core';
import {HeroesModule} from './heroes.module';

@Injectable({
  providedIn: HeroesModule
})
export class HeroService {

  constructor() {
  }
}
