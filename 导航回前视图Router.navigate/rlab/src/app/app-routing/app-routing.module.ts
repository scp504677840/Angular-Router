import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrisisListComponent} from '../crisis-list/crisis-list.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';

/**
 * 路由配置
 */
const appRoutes: Routes = [
  {path: 'crisis-center', component: CrisisListComponent},
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
  exports: [RouterModule]
})
export class AppRoutingModule {
}
