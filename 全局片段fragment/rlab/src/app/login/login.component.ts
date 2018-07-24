import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/crisis-center/admin';

        // 设置我们的导航附加对象，它传递我们的全局查询参数和片段
        const navigationExtras: NavigationExtras = {
          // queryParamsHandling: 'preserve',
          preserveQueryParams: true,
          preserveFragment: true
        };
        // queryParamsHandling 特性还提供了 merge 选项，它将会在导航时保留当前的查询参数，并与其它查询参数合并。
        // “查询参数”和“片段”也可以分别用 RouterLink 中的 preserveQueryParams 和 preserveFragment 保存。

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
