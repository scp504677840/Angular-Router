import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      // 将路径路径添加到预加载的模块阵列
      this.preloadedModules.push(route.path);

      console.log('Preloaded: ' + route.path);

      return fn();
    } else {
      return of(null);
    }
  }
}
