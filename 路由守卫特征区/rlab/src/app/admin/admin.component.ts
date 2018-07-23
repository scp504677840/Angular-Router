import {Component, OnInit} from '@angular/core';

/**
 * 路由守卫
 * 现在，任何用户都能在任何时候导航到任何地方。 但有时候这样是不对的。
 * - 该用户可能无权导航到目标组件。
 * - 可能用户得先登录（认证）。
 * - 在显示目标组件前，你可能得先获取某些数据。
 * - 在离开组件前，你可能要先保存修改。
 * - 你可能要询问用户：你是否要放弃本次更改，而不用保存它们？
 *
 * 你可以往路由配置中添加守卫，来处理这些场景。
 *
 * 守卫返回一个值，以控制路由器的行为：
 * 如果它返回 true，导航过程会继续
 * 如果它返回 false，导航过程会终止，且用户会留在原地。
 *
 * 守卫还可以告诉路由器导航到别处，这样也取消当前的导航。
 *
 * 守卫可以用同步的方式返回一个布尔值。
 * 但在很多情况下，守卫无法用同步的方式给出答案。
 * 守卫可能会向用户问一个问题、把更改保存到服务器，或者获取新数据，而这些都是异步操作。
 *
 * 因此，路由的守卫可以返回一个 Observable<boolean> 或 Promise<boolean>，
 * 并且路由器会等待这个可观察对象被解析为 true 或 false。
 *
 * 路由器可以支持多种守卫接口：
 * - 用CanActivate来处理导航到某路由的情况。
 * - 用CanActivateChild来处理导航到某子路由的情况。
 * - 用CanDeactivate来处理从当前路由离开的情况.
 * - 用Resolve在路由激活之前获取路由数据。
 * - 用CanLoad来处理异步导航到某特性模块的情况。
 *
 * 在分层路由的每个级别上，你都可以设置多个守卫。
 * 路由器会先按照从最深的子路由由下往上检查的顺序来检查 CanDeactivate() 和 CanActivateChild() 守卫。
 * 然后它会按照从上到下的顺序检查 CanActivate() 守卫。
 * 如果特性模块是异步加载的，在加载它之前还会检查 CanLoad() 守卫。
 * 如果任何一个守卫返回 false，其它尚未完成的守卫会被取消，这样整个导航就被取消了。
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
