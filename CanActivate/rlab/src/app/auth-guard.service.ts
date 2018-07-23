import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

/**
 * 注意，你把 AuthService 和 Router 服务注入到构造函数中。
 * 你还没有提供 AuthService，这里要说明的是：可以往路由守卫中注入有用的服务。
 *
 * 该守卫返回一个同步的布尔值。如果用户已经登录，它就返回 true，导航会继续。
 *
 * 这个 ActivatedRouteSnapshot 包含了即将被激活的路由，
 * 而 RouterStateSnapshot 包含了该应用即将到达的状态。
 * 你应该通过守卫进行检查。
 *
 * 如果用户还没有登录，
 * 你就会用 RouterStateSnapshot.url 保存用户来自的 URL 并让路由器导航到登录页（你尚未创建该页）。
 * 这间接导致路由器自动中止了这次导航，checkLogin() 返回 false 并不是必须的，但这样可以更清楚的表达意图。
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    // admin
    console.log(`route.url: ${route.url}`);
    // /admin/heroes
    console.log(`state.url: ${state.url}`);

    const url = state.url;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // 记录登录成功以后重定向的URL
    this.authService.redirectUrl = url;

    // 导航到登录页面
    this.router.navigate(['/login']);

    return false;
  }
}
