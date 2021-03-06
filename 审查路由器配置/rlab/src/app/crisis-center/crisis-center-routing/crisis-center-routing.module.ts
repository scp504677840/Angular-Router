import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CrisisCenterComponent} from '../crisis-center.component';
import {CrisisListComponent} from '../crisis-list/crisis-list.component';
import {CrisisCenterHomeComponent} from '../crisis-center-home/crisis-center-home.component';
import {CrisisDetailComponent} from '../crisis-detail/crisis-detail.component';
import {CanDeactivateGuardService} from '../../can-deactivate-guard.service';
import {CrisisDetailResolverService} from '../crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuardService],
            resolve: {
              crisis: CrisisDetailResolverService
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [RouterModule],
  providers: [CrisisDetailResolverService]
})
export class CrisisCenterRoutingModule {
}
