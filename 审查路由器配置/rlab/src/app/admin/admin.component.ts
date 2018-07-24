import {Component, OnInit} from '@angular/core';

/**
 * 审查路由器配置
 * 你把大量的精力投入到在一系列路由模块文件里配置路由器上，并且小心的以合适的顺序列出它们。
 * 这些路由是否真的如同你预想的那样执行了？ 路由器的真实配置是怎样的？
 *
 * 通过注入它（Router）并检查它的 config 属性，你可以随时审查路由器的当前配置。
 * 例如，把 AppModule 修改为这样，并在浏览器的控制台窗口中查看最终的路由配置。
 * export class AppModule {
 *   constructor(router: Router) {
 *     console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
 *   }
 * }
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
