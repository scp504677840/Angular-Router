import {Component, OnInit} from '@angular/core';

/**
 * 链接参数数组
 * 链接参数数组保存路由导航时所需的成分：
 * 1.指向目标组件的那个路由的路径（path）
 * 2.必备路由参数和可选路由参数，它们将进入该路由的 URL
 *
 * 你可以把 RouterLink 指令绑定到一个数组，就像这样：
 * <a [routerLink]="['/heroes']">Heroes</a>
 *
 * 在指定路由参数时，你写过一个双元素的数组，就像这样：
 * <a [routerLink]="['/hero', hero.id]">
 *     <span class="badge">{{ hero.id }}</span>{{ hero.name }}
 * </a>
 *
 * 你可以在对象中提供可选的路由参数，就像这样：
 * <a [routerLink]="['/crisis-center', { foo: 'foo' }]">Crisis Center</a>
 * 这三个例子涵盖了你在单级路由的应用中所需的一切。在你添加一个像危机中心一样的子路由时，你可以创建新链接数组。
 *
 * 回忆一下，你曾为危机中心指定过一个默认的子路由，以便能使用这种简单的 RouterLink。
 * <a [routerLink]="['/crisis-center']">Crisis Center</a>
 * 分解一下。
 * - 数组中的第一个条目标记出了父路由(/crisis-center)。
 * - 这个父路由没有参数，因此这步已经完成了。
 * - 没有默认的子路由，因此你得选取一个。
 * - 你决定跳转到 CrisisListComponent，它的路由路径是'/'，但你不用显式的添加它。
 *
 * 更进一步。这次要构建一个从根组件往下导航到“巨龙危机”时的链接参数数组：
 * <a [routerLink]="['/crisis-center', 1]">Dragon Crisis</a>
 * - 数组中的第一个条目标记出了父路由(/crisis-center)。
 * - 这个父路由没有参数，因此这步已经完成了。
 * - 数组中的第二个条目（'/:id'）用来标记出到指定危机的详情页的子路由。
 * - 详细的子路由需要一个 id 路由参数。
 * - 你把巨龙危机的 id 添加为该数组中的第二个条目（1）。
 * - 最终生成的路径是 /crisis-center/1。
 *
 * 只要想，你也可以用危机中心路由单独重定义 AppComponent 的模板：
 *   <h1 class="title">Angular Router</h1>
 *   <nav>
 *      <a [routerLink]="['/crisis-center']">Crisis Center</a>
 *      <a [routerLink]="['/crisis-center/1', { foo: 'foo' }]">Dragon Crisis</a>
 *      <a [routerLink]="['/crisis-center/2']">Shark Crisis</a>
 *   </nav>
 *   <router-outlet></router-outlet>
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
