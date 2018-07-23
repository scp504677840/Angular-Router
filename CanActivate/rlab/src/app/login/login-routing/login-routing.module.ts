import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login.component';
import {AuthService} from '../../auth.service';
import {AuthGuardService} from '../../auth-guard.service';

const loginRoutes: Routes = [
  {path: 'login', component: LoginComponent}
];

/**
 * 它们所需的守卫和服务提供商必须在模块一级提供。
 * 这让路由器在导航过程中可以通过 Injector 来取得这些服务。
 * 同样的规则也适用于异步加载的特性模块。
 */
@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuardService]
})
export class LoginRoutingModule {
}
