import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {slideInDownAnimation} from '../../animations';

/**
 * ActivatedRoute
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {
  }

  ngOnInit() {

    // 当该组件永远永远都不会复用时，可以使用下列方式获取路由参数。
    // const id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.service.getHero(id);

    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // 传递英雄ID（如果可用），以便HeroList组件可以选择该英雄。包括'foo'属性。
    this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}]);
  }
}
