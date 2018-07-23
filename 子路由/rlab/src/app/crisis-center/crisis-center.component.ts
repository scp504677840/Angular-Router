import {Component, OnInit} from '@angular/core';

/**
 * CrisisCenterComponent 和 AppComponent 有下列共同点：
 * 它是危机中心特性区的根，正如 AppComponent 是整个应用的根。
 * 它是危机管理特性区的壳，正如 AppComponent 是管理高层工作流的壳。
 *
 * 就像大多数的壳一样，CrisisCenterComponent 类也非常简单，
 * 甚至比 AppComponent 更简单： 它没有业务逻辑，它的模板中没有链接，只有一个标题和用于放置危机中心的子视图的 <router-outlet>。
 *
 * 与 AppComponent 和大多数其它组件不同的是，它甚至都没有指定选择器 selector。
 * 它不需要选择器，因为你不会把这个组件嵌入到某个父模板中，而是使用路由器导航到它。
 *
 * 子路由配置
 * 把下面这个 crisis-center-home.component.ts 添加到 crisis-center 目录下，作为 "危机中心" 特性区的宿主页面。
 * 像 heroes-routing.module.ts 文件一样，
 * 你也创建一个 crisis-center-routing.module.ts。 但这次，你要把子路由定义在父路由 crisis-center 中。
 * @see CrisisCenterRoutingModule
 * 注意，父路由 crisis-center 有一个 children 属性，
 * 它有一个包含 CrisisListComponent 的路由。
 * CrisisListModule 路由还有一个带两个路由的 children 数组。
 *
 * 这两个路由导航到了危机中心的两个子组件：CrisisCenterHomeComponent 和 CrisisDetailComponent。
 * 对这些路由的处理中有一些重要的不同。
 *
 * 路由器会把这些路由对应的组件放在 CrisisCenterComponent 的 RouterOutlet 中，而不是 AppComponent 壳组件中的。
 *
 * CrisisListComponent 包含危机列表和一个 RouterOutlet，用以显示 Crisis Center Home 和 Crisis Detail 这两个路由组件。
 *
 * Crisis Detail 路由是 Crisis List 的子路由。
 * 由于路由器默认会复用组件，因此当你选择了另一个危机时，CrisisDetailComponent 会被复用。
 *
 * 作为对比，回到 Hero Detail 路由时，每当你选择了不同的英雄时，该组件都会被重新创建。
 * 在顶级，以 / 开头的路径指向的总是应用的根。
 * 但这里是子路由。
 * 它们是在父路由路径的基础上做出的扩展。
 * 在路由树中每深入一步，你就会在该路由的路径上添加一个斜线 /（除非该路由的路径是空的）。
 *
 * 如果把该逻辑应用到危机中心中的导航，那么父路径就是 /crisis-center。
 * 1.要导航到 CrisisCenterHomeComponent，完整的 URL 是 /crisis-center (/crisis-center + '' + '')。
 * 2.要导航到 CrisisDetailComponent 以展示 id=2 的危机，
 * 完整的 URL 是 /crisis-center/2 (/crisis-center + '' + '/2')。
 *
 */
@Component({
  selector: 'app-crisis-center',
  templateUrl: './crisis-center.component.html',
  styleUrls: ['./crisis-center.component.css']
})
export class CrisisCenterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
