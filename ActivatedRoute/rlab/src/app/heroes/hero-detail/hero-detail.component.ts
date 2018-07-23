import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {slideInDownAnimation} from '../../animations';

/**
 * ActivatedRoute 服务中的路由参数
 * 英雄列表仍没有改变，没有哪个英雄列被加亮显示。
 * HeroListComponent 还完全不需要任何参数，也不知道该怎么处理它们。你可以改变这一点。
 *
 * 以前，当从 HeroListComponent 导航到 HeroDetailComponent 时，
 * 你通过 ActivatedRoute 服务订阅了路由参数这个 Observable，
 * 并让它能用在 HeroDetailComponent 中。
 * 你把该服务注入到了 HeroDetailComponent 的构造函数中。
 *
 * 这次，你要进行反向导航，从 HeroDetailComponent 到 HeroListComponent。
 * 首先，你扩展该路由的导入语句，以包含进 ActivatedRoute 服务的类；
 * ngOnInit() {
 *   this.heroes$ = this.route.paramMap.pipe(
 *     switchMap((params: ParamMap) => {
 *       // (+) before `params.get()` turns the string into a number
 *       this.selectedId = +params.get('id');
 *       return this.service.getHeroes();
 *     })
 *   );
 * }
 * ActivatedRoute.paramMap 属性是一个路由参数的可观察对象。
 * 当用户导航到这个组件时，paramMap 会发射一个新值，其中包含 id。
 * 在 ngOnInit 中，你订阅了这些值，设置到 selectedId，并获取英雄数据。
 *
 * 用 CSS 类绑定更新模板，把它绑定到 isSelected 方法上。
 * 如果该方法返回 true，此绑定就会添加 CSS 类 selected，否则就移除它。
 * 在 <li> 标记中找到它，就像这样：
 *  <li *ngFor="let hero of heroes$ | async" [class.selected]="hero.id === selectedId">
 * 这儿可选的 foo 路由参数继续被忽略。
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
