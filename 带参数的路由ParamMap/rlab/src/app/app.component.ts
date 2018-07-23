import {Component} from '@angular/core';

/**
 * 带参数的路由定义
 * 回到 HeroesRoutingModule 并再次检查这些路由定义。
 * HeroDetailComponent 的路由有点特殊。
 * { path: 'hero/:id', component: HeroDetailComponent }
 * 注意路径中的 :id 令牌。它为路由参数在路径中创建一个“空位”。在这里，路由器把英雄的 id 插入到那个“空位”中。
 * 如果要告诉路由器导航到详情组件，并让它显示“Magneta”，你会期望这个英雄的 id 像这样显示在浏览器的 URL 中：
 * localhost:4200/hero/15
 * 如果用户把此 URL 输入到浏览器的地址栏中，路由器就会识别出这种模式，同样进入“Magneta”的详情视图。
 *
 * 路由参数：必须的还是可选的？
 * 在这个场景下，把路由参数的令牌 :id 嵌入到路由定义的 path 中是一个好主意，
 * 因为对于 HeroDetailComponent 来说 id 是必须的，
 * 而且路径中的值 15 已经足够把到“Magneta”的路由和到其它英雄的路由明确区分开。
 *
 * 在列表视图中设置路由参数
 * 然后导航到 HeroDetailComponent 组件。
 * 在那里，你期望看到所选英雄的详情，这需要两部分信息：导航目标和该英雄的 id。
 * 因此，这个链接参数数组中有两个条目：目标路由的path（路径），和一个用来指定所选英雄 id 的路由参数。
 * ['/hero', hero.id] // { 15 }
 * 路由器从该数组中组合出了目标 URL： localhost:4200/hero/15。
 *
 * 目标组件 HeroDetailComponent 该怎么知道这个 id 参数呢？ 当然不会是自己去分析 URL 了！那是路由器的工作。
 *
 * 路由器从 URL 中解析出路由参数（id:15），并通过 ActivatedRoute 服务来把它提供给 HeroDetailComponent 组件。
 *
 * Activated Route 实战
 * 从路由器（router）包中导入 Router、ActivatedRoute 和 Params 类。
 * 然后，在 ngOnInit 方法中，你用 ActivatedRoute 服务来接收路由的参数，从参数中取得该英雄的 id，并接收此英雄用于显示。
 * @see HeroDetailComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
