import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {slideInDownAnimation} from '../../animations';

/**
 * paramMap 的处理过程有点稍复杂。当这个 map 的值变化时，你可以从变化之后的参数中 get() 到其 id 参数。
 * 然后，让 HeroService 去获取一个具有此 id 的英雄，并返回这个 HeroService 请求的结果。
 * 你可能想使用 RxJS 的 map 操作符。
 * 但 HeroService 返回的是一个 Observable<Hero>。
 * 所以你要改用 switchMap 操作符来打平这个 Observable。
 *
 * switchMap 操作符还会取消以前未完成的在途请求。
 * 如果用户使用新的 id 再次导航到该路由，
 * 而 HeroService 仍在接受老 id 对应的英雄，
 * 那么 switchMap 就会抛弃老的请求，并返回这个新 id 的英雄信息。
 *
 * 这个可观察对象的 Subscription（订阅）将会由 AsyncPipe 处理，并且组件的 hero 属性将会设置为刚刚接收到的这个英雄。
 *
 * ParamMap API
 * ParamMap API 是参照URLSearchParams 接口来设计的。
 * 它提供了一些方法来处理对路由参数（paramMap）和查询参数(queryParamMap)中的参数访问。
 *
 * has(name)
 * 如果参数名位于参数列表中，就返回 true 。
 *
 * get(name)
 * 如果这个 map 中有参数名对应的参数值（字符串），就返回它，否则返回 null。如果参数值实际上是一个数组，就返回它的第一个元素。
 *
 * getAll(name)
 * 如果这个 map 中有参数名对应的值，就返回一个字符串数组，否则返回空数组。当一个参数名可能对应多个值的时候，请使用 getAll。
 *
 * keys
 * 返回这个 map 中的所有参数名组成的字符串数组。
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [ slideInDownAnimation ]
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // 传递英雄ID（如果可用），以便HeroList组件可以选择该英雄。包括'foo'属性。
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
}
