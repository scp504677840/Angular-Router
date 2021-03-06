import {Component, OnInit} from '@angular/core';

/**
 * CanActivateChild：保护子路由
 * 你还可以使用 CanActivateChild 守卫来保护子路由。
 * CanActivateChild 守卫和 CanActivate 守卫很像。
 * 它们的区别在于，CanActivateChild 会在任何子路由被激活之前运行。
 *
 * 你要保护管理特性模块，防止它被非授权访问，还要保护这个特性模块内部的那些子路由。
 * 扩展 AuthGuard 以便在 admin 路由之间导航时提供保护。
 * 打开 auth-guard.service.ts 并从路由库中导入 CanActivateChild 接口。
 *
 * 接下来，实现 CanActivateChild 方法，
 * 它所接收的参数与 CanActivate 方法一样：一个 ActivatedRouteSnapshot 和一个 RouterStateSnapshot。
 * CanActivateChild 方法可以返回 Observable<boolean> 或 Promise<boolean> 来支持异步检查，或 boolean 来支持同步检查。
 * 这里返回的是 boolean：
 * @see AuthGuardService
 * @see AuthGuardService.canActivateChild
 *
 * 同样把这个 AuthGuard 添加到“无组件的”管理路由，来同时保护它的所有子路由，而不是为每个路由单独添加这个 AuthGuard。
 * @see adminRoutes
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
