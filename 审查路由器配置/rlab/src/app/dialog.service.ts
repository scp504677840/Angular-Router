import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  /**
   * 要求用户确认操作。 `message`解释了行动和选择。
   * 返回可观察的解析为`true` = confirm或`false` = cancel
   */
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');
    return of(confirmation);
  }
}
