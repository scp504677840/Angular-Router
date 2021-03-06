import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {slideInDownAnimation} from '../../animations';

/**
 * 参数的可观察对象（Observable）与组件复用
 * 在这个例子中，你接收了路由参数的 Observable 对象。
 * 这种写法暗示着这些路由参数在该组件的生存期内可能会变化。
 *
 * 确实如此！默认情况下，如果它没有访问过其它组件就导航到了同一个组件实例，
 * 那么路由器倾向于复用组件实例。如果复用，这些参数可以变化。
 *
 * 假设父组件的导航栏有“前进”和“后退”按钮，
 * 用来轮流显示英雄列表中中英雄的详情。
 * 每次点击都会强制导航到带前一个或后一个 id 的 HeroDetailComponent 组件。
 *
 * 你不希望路由器仅仅从 DOM 中移除当前的 HeroDetailComponent 实例，并且用下一个 id 重新创建它。
 * 那可能导致界面抖动。 更好的方式是复用同一个组件实例，并更新这些参数。
 *
 * 不幸的是，ngOnInit 对每个实例只调用一次。
 * 你需要一种方式来检测在同一个实例中路由参数什么时候发生了变化。
 * 而 params 属性这个可观察对象（Observable）干净漂亮的处理了这种情况。
 *
 * 当在组件中订阅一个可观察对象时，你通常总是要在组件销毁时取消这个订阅。
 * 但是也有少数例外情况不需要取消订阅。 ActivateRoute 中的各种可观察对象就是属于这种情况。
 * ActivateRoute 及其可观察对象都是由 Router 本身负责管理的。
 * Router 会在不再需要时销毁这个路由组件，而注入进去的 ActivateRoute 也随之销毁了。
 * 不过，你仍然可以随意取消订阅，这不会造成任何损害，而且也不是一项坏的实践。
 *
 * Snapshot（快照）：当不需要 Observable 时的替代品
 * 本应用不需要复用 HeroDetailComponent。
 * 用户总是会先返回英雄列表，再选择另一位英雄。
 * 所以，不存在从一个英雄详情导航到另一个而不用经过英雄列表的情况。
 * 这意味着路由器每次都会创建一个全新的 HeroDetailComponent 实例。
 *
 * 假如你很确定这个 HeroDetailComponent 组件的实例永远、永远不会被复用，那就可以使用快照来简化这段代码。
 *
 * route.snapshot 提供了路由参数的初始值。
 * 你可以通过它来直接访问参数，而不用订阅或者添加 Observable 的操作符。
 * 这样在读写时就会更简单：
 * ngOnInit() {
 *    let id = this.route.snapshot.paramMap.get('id');
 *    this.hero$ = this.service.getHero(id);
 * }
 *
 * 记住：，用这种技巧，你只得到了这些参数的初始值。
 * 如果有可能连续多次导航到此组件，那么就该用 paramMap 可观察对象的方式。
 * 这个例子中仍然使用了 paramMap 的可观察对象策略。
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
