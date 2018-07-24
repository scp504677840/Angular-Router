import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {ComposeMessageComponent} from '../compose-message/compose-message.component';
import {CanDeactivateGuardService} from '../can-deactivate-guard.service';
import {AuthGuardService} from '../auth-guard.service';
import {SelectivePreloadingStrategy} from '../selective-preloading-strategy';

/**
 * 路由配置
 */
const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'crisis-center',
    loadChildren: 'src/app/crisis-center/crisis-center.module#CrisisCenterModule',
    data: {preload: true}
  },
  {
    path: '',
    redirectTo: '/superheroes',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    // enableTracing: true仅用于调试目的
    RouterModule.forRoot(appRoutes, {
      enableTracing: true,
      // preloadingStrategy: PreloadAllModules
      preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: [CanDeactivateGuardService, SelectivePreloadingStrategy]
})
export class AppRoutingModule {
}
