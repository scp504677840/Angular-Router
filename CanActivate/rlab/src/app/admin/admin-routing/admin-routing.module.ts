import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../admin.component';
import {ManageCrisesComponent} from '../manage-crises/manage-crises.component';
import {ManageHeroesComponent} from '../manage-heroes/manage-heroes.component';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import {AuthGuardService} from '../../auth-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          {path: 'crises', component: ManageCrisesComponent},
          {path: 'heroes', component: ManageHeroesComponent},
          {path: '', component: AdminDashboardComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
