import {Component, OnInit} from '@angular/core';

/**
 * 查询参数及片段
 * 在这个查询参数例子中，你只为路由指定了参数，但是该如何定义一些所有路由中都可用的可选参数呢？ 这就该“查询参数”登场了。
 * 片段可以引用页面中带有特定 id 属性的元素.
 * 修改 AuthGuard 以提供 session_id 查询参数，在导航到其它路由后，它还会存在。
 * 再添加一个锚点（A）元素，来让你能跳转到页面中的正确位置。
 * 为 router.navigate 方法添加一个 NavigationExtras 对象，用来导航到 /login 路由。
 * @see AuthGuardService.checkLogin
 *
 * 还可以在导航之间保留查询参数和片段，而无需再次再导航中提供。
 * 在 LoginComponent 中的 router.navigate 方法中，添加第二个参数，
 * 该对象提供了 preserveQueryParams 和 preserveFragment，用于传递到当前的查询参数中并为下一个路由提供片段。
 * @see LoginComponent
 *
 * 由于要在登录后导航到危机管理特征区的路由，所以你还得修改它，来处理这些全局查询参数和片段。
 * @see AdminDashboardComponent
 *
 * 查询参数和片段可通过 Router 服务的 routerState 属性使用。
 * 和路由参数类似，全局查询参数和片段也是 Observable 对象。
 * 在修改过的英雄管理组件中，你将借助 AsyncPipe 直接把 Observable 传给模板。
 *
 * 按照下列步骤试验下：点击Crisis Admin按钮，它会带着你提供的 queryParamMap 和 fragment 跳转到登录页。
 * 点击登录按钮，你就会被重定向到 Admin Dashboard 页。
 * 注意，它仍然带着上一步提供的 queryParamMap 和 fragment。
 *
 * 你可以用这些持久化信息来携带需要为每个页面都提供的信息，如认证令牌或会话的 ID 等。
 *
 * “查询参数”和“片段”也可以分别用 RouterLink 中的 preserveQueryParams 和 preserveFragment 保存。
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
