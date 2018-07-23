import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {slideInDownAnimation} from '../../animations';

/**
 * 路由参数：必须还是可选？
 * 如果想导航到 HeroDetailComponent 以对 id 为 15 的英雄进行查看并编辑，就要在路由的 URL 中使用路由参数来指定必要参数值。
 * localhost:4200/hero/15
 * 你也能在路由请求中添加可选信息。
 * 比如，当从 HeroDetailComponent 返回英雄列表时，如果能自动选中刚刚查看过的英雄就好了。
 * 当从 HeroDetailComponent 返回时，你很快就会通过把正在查看的英雄的 id 作为可选参数包含在 URL 中来实现这个特性。
 *
 * 可选信息有很多种形式。
 * 搜索条件通常就不是严格结构化的，比如 name='wind*'；有多个值也很常见，
 * 如 after='12/31/2015'&before='1/1/2017'；
 * 而且顺序无关，如 before='1/1/2017'&after='12/31/2015'，
 * 还可能有很多种变体格式，如 during='currentYear'。
 *
 * 这么多种参数要放在 URL 的路径中可不容易。
 * 即使你能制定出一个合适的 URL 方案，实现起来也太复杂了，得通过模式匹配才能把 URL 翻译成命名路由。
 *
 * 可选参数是在导航期间传送任意复杂信息的理想载体。
 * 可选参数不涉及到模式匹配并在表达上提供了巨大的灵活性。
 *
 * 和必要参数一样，路由器也支持通过可选参数导航。
 * 在你定义完必要参数之后，再通过一个独立的对象来定义可选参数。
 *
 * 通常，对于强制性的值（比如用于区分两个路由路径的）使用必备参数；当这个值是可选的、复杂的或多值的时，使用可选参数。
 *
 * 英雄列表：选定一个英雄（也可不选）
 * 当导航到 HeroDetailComponent 时，你可以在路由参数中指定一个所要编辑的英雄 id，
 * 只要把它作为链接参数数组中的第二个条目就可以了。
 * ['/hero', hero.id] // { 15 }
 * 路由器在导航 URL 中内嵌了 id 的值，这是因为你把它用一个 :id 占位符当做路由参数定义在了路由的 path 中：
 * { path: 'hero/:id', component: HeroDetailComponent }
 *
 * 当用户点击后退按钮时，HeroDetailComponent 构造了另一个链接参数数组，可以用它导航回 HeroListComponent。
 * gotoHeroes() {
 *    this.router.navigate(['/heroes']);
 * }
 * 该数组缺少一个路由参数，这是因为你那时没有理由往 HeroListComponent 发送信息。
 * 但现在有了。
 * 你要在导航请求中同时发送当前英雄的 id，以便 HeroListComponent 可以在列表中高亮这个英雄。
 * 这是一个有更好，没有也无所谓的特性，就算没有它，列表照样能显示得很完美。
 *
 * 传送一个包含可选id 参数的对象。
 * 为了演示，这里还在对象中定义了一个没用的额外参数（foo），
 * HeroListComponent 应该忽略它。
 * 下面是修改过的导航语句：
 * gotoHeroes(hero: Hero) {
 *    let heroId = hero ? hero.id : null;
 *    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
 * }
 * 该应用仍然能工作。点击“back”按钮返回英雄列表视图。
 * 注意浏览器的地址栏。
 * 它应该是这样的，不过也取决于你在哪里运行它：
 * localhost:4200/heroes;id=15;foo=foo
 * id 的值像这样出现在 URL 中（;id=15;foo=foo），但不在 URL 的路径部分。
 * “Heroes”路由的路径部分并没有定义 :id。
 *
 * 可选的路由参数没有使用“？”和“&”符号分隔，因为它们将用在 URL 查询字符串中。
 * 它们是用“;”分隔的。 这是矩阵 URL标记法 —— 你以前可能从未见过。
 *
 * Matrix URL写法首次提出是在1996 提案中，提出者是 Web 的奠基人：Tim Berners-Lee。
 *
 * 虽然 Matrix 写法未曾进入过 HTML 标准，但它是合法的。
 * 而且在浏览器的路由系统中，
 * 它作为从父路由和子路由中单独隔离出参数的方式而广受欢迎。
 * Angular 的路由器正是这样一个路由系统，并支持跨浏览器的 Matrix 写法。
 *
 * 这种语法对你来说可能有点奇怪，
 * 不过用户不会在意这一点，
 * 因为该 URL 可以正常的通过邮件发出去或粘贴到浏览器的地址栏中。
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
