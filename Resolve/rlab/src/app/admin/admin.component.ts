import {Component, OnInit} from '@angular/core';

/**
 * Resolve: 预先获取组件数据
 * 在 Hero Detail 和 Crisis Detail 中，它们等待路由读取完对应的英雄和危机。
 *
 * 这种方式没有问题，但是它们还有进步的空间。
 * 如果你在使用真实 api，很有可能数据返回有延迟，导致无法即时显示。
 * 在这种情况下，直到数据到达前，显示一个空的组件不是最好的用户体验。
 *
 * 最好预先从服务器上获取完数据，这样在路由激活的那一刻数据就准备好了。
 * 还要在路由到此组件之前处理好错误。
 * 但当某个 id 无法对应到一个危机详情时，就没办法处理它。
 * 这时最好把用户带回到“危机列表”中，那里显示了所有有效的“危机”。
 *
 * 总之，你希望的是只有当所有必要数据都已经拿到之后，才渲染这个路由组件。
 *
 * 你需要 Resolve 守卫。
 *
 * 导航前预先加载路由信息
 * 目前，CrisisDetailComponent 会接收选中的危机。 如果该危机没有找到，它就会导航回危机列表视图。
 *
 * 如果能在该路由将要激活时提前处理了这个问题，那么用户体验会更好。
 * CrisisDetailResolver 服务可以接收一个 Crisis，而如果这个 Crisis 不存在，
 * 就会在激活该路由并创建 CrisisDetailComponent 之前先行离开。
 *
 * 在“危机中心”特性区中创建 crisis-detail-resolver.service.ts 文件。
 * @see CrisisDetailResolverService
 *
 * 在 CrisisDetailComponent.ngOnInit 中拿到相关的危机检索逻辑，并且把它们移到 CrisisDetailResolver 中。
 * 导入 Crisis 模型、CrisisService 和 Router 以便让你可以在找不到指定的危机时导航到别处。
 *
 * 为了更明确一点，可以实现一个带有 Crisis 类型的 Resolve 接口。
 *
 * 注入 CrisisService 和 Router，并实现 resolve() 方法。
 * 该方法可以返回一个 Promise、一个 Observable 来支持异步方式，或者直接返回一个值来支持同步方式。
 *
 * CrisisService.getCrisis 方法返回了一个可观察对象，
 * 这是为了防止在数据获取完毕前加载路由。
 * 如果它没有返回一个有效的 Crisis，就把用户导航回 CrisisListComponent，
 * 并取消以前到 CrisisDetailComponent 尚未完成的导航。
 *
 * 把这个解析器（resolver）导入到 crisis-center-routing.module.ts 中，
 * 并往 CrisisDetailComponent 的路由配置中添加一个 resolve 对象。
 *
 * 别忘了把 CrisisDetailResolver 服务添加到 CrisisCenterRoutingModule 的 providers 数组中。
 * @see CrisisCenterRoutingModule
 *
 * 当使用resolver时，取值方式发生了改变：
 * @see CrisisDetailComponent.ngOnInit
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
