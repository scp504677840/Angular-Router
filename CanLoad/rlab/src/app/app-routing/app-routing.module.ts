import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {ComposeMessageComponent} from '../compose-message/compose-message.component';
import {CanDeactivateGuardService} from '../can-deactivate-guard.service';
import {AuthGuardService} from '../auth-guard.service';

/**
 * 路由配置
 */
const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    // enableTracing: true仅用于调试目的
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  exports: [RouterModule],
  providers: [CanDeactivateGuardService]
})
export class AppRoutingModule {
}
