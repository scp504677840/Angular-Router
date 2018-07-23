import {Component, HostBinding} from '@angular/core';
import {slideInDownAnimation} from '../animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css'],
  animations: [slideInDownAnimation]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  details: string;
  message: string;
  sending = false;

  constructor(private router: Router) {
  }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // 为命名插座提供“null”值会清除指定插座的内容
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
