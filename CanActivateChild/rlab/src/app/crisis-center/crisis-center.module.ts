import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrisisListComponent} from './crisis-list/crisis-list.component';
import {CrisisCenterHomeComponent} from './crisis-center-home/crisis-center-home.component';
import {CrisisCenterComponent} from './crisis-center.component';
import {CrisisDetailComponent} from './crisis-detail/crisis-detail.component';
import {FormsModule} from '@angular/forms';
import {CrisisCenterRoutingModule} from './crisis-center-routing/crisis-center-routing.module';
import {CrisisService} from './crisis.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule
  ],
  declarations: [
    CrisisListComponent,
    CrisisCenterHomeComponent,
    CrisisCenterComponent,
    CrisisDetailComponent
  ],
  providers: [CrisisService]
})
export class CrisisCenterModule {
}
