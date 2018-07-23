import {Injectable} from '@angular/core';
import {HeroesModule} from './heroes.module';
import {of} from 'rxjs';
import {Hero} from './hero';
import {map} from 'rxjs/operators';

const HEROES = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];

@Injectable()
export class HeroService {

  getHeroes() {
    return of(HEROES);
  }

  getHero(id: number | string) {
    return this.getHeroes().pipe(
      // （+）在`id`之前将字符串转换为数字
      map(heroes => heroes.find(hero => hero.id === +id))
    );
  }
}
