import {Component, OnInit} from '@angular/core';

/**
 * CanActivate: 要求认证
 * 应用程序通常会根据访问者来决定是否授予某个特性区的访问权。
 * 你可以只对已认证过的用户或具有特定角色的用户授予访问权，还可以阻止或限制用户访问权，直到用户账户激活为止。
 *
 * CanActivate 守卫是一个管理这些导航类业务规则的工具。
 *
 * 由于 AdminModule 中 AdminComponent 中的 RouterLink 是一个空路径的路由，所以它会匹配到管理特性区的任何路由。
 * 但你只有在访问 Dashboard 路由时才希望该链接被激活。
 * 往 Dashboard 这个 routerLink 上添加另一个绑定 [routerLinkActiveOptions]="{ exact: true }"，
 * 这样就只有当用户导航到 /admin 这个 URL 时才会激活它，而不会在导航到它的某个子路由时。
 * @see src/app/admin/admin.component.html
 *
 * 无组件路由: 不借助组件对路由进行分组
 * 来看 AdminComponent 下的子路由，这里有一个带 path 和 children 的子路由， 但它没有使用 component。
 * 这并不是配置中的失误，而是在使用无组件路由。
 *
 * 这里的目标是对 admin 路径下的 危机中心 管理类路由进行分组，
 * 但并不需要另一个仅用来分组路由的组件。 一个无组件的路由能让守卫子路由变得更容易。
 *
 * 接下来，把 AdminModule 导入到 app.module.ts 中，并把它加入 imports 数组中来注册这些管理类路由。
 * @see AdminRoutingModule
 *
 * 守护“管理特性”区
 * 现在“危机中心”的每个路由都是对所有人开放的。这些新的管理特性应该只能被已登录用户访问。
 * 你可以在用户登录之前隐藏这些链接，但这样会有点复杂并难以维护。
 * 你可以换种方式：写一个 CanActivate() 守卫，将正在尝试访问管理组件匿名用户重定向到登录页。
 * 这是一种具有通用性的守护目标（通常会有其它特性需要登录用户才能访问），所以你要在应用的根目录下创建一个 auth-guard.ts 文件。
 * 此刻，你的兴趣在于看看守卫是如何工作的，所以第一个版本没做什么有用的事情。
 * 它只是往控制台写日志，并且立即返回 true，让导航继续：
 * @see AuthGuardService
 *
 * 教 AuthGuard 进行认证
 * 先让 AuthGuard 至少能“假装”进行认证。
 * AuthGuard 可以调用应用中的一项服务，该服务能让用户登录，并且保存当前用户的信息。
 * 下面是一个 AuthService 的示范：
 * @see AuthService
 *
 * 虽然它不会真的进行登录，但足够让你进行这个讨论了。
 * 它有一个 isLoggedIn 标志，用来标识是否用户已经登录过了。
 * 它的 login 方法会仿真一个对外部服务的 API 调用，返回一个可观察对象（observable）。
 * 在短暂的停顿之后，这个可观察对象就会解析成功。
 * redirectUrl 属性将会保存在 URL 中，以便认证完之后导航到它。
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
