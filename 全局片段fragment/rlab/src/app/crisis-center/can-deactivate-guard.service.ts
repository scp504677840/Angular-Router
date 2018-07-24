import {CrisisDetailComponent} from './crisis-detail/crisis-detail.component';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * 另外，你也可以为 CrisisDetailComponent 创建一个特定的 CanDeactivate 守卫。
 * 在需要访问外部信息时，canDeactivate() 方法为你提供了组件、ActivatedRoute 和 RouterStateSnapshot 的当前实例。
 * 如果只想为这个组件使用该守卫，并且需要获取该组件属性或确认路由器是否允许从该组件导航出去时，这会非常有用。
 *
 * 仅供参考，无需提供注册。
 */
@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CrisisDetailComponent> {

  canDeactivate(
    component: CrisisDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    // Get the Crisis Center ID
    console.log(route.paramMap.get('id'));

    // Get the current URL
    console.log(state.url);

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!component.crisis || component.crisis.name === component.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return component.dialogService.confirm('Discard changes?');
  }
}
