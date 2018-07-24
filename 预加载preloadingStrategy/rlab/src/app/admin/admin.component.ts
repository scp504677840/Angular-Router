import {Component, OnInit} from '@angular/core';

/**
 * 预加载：特性区的后台加载
 * 你已经学会了如何按需加载模块，接下来再看看如何使用预加载技术异步加载模块。
 *
 * 看起来好像应用一直都是这么做的，但其实并非如此。
 * AppModule 在应用启动时就被加载了，它是立即加载的。
 * 而 AdminModule 只有当用户点击某个链接时才会加载，它是惰性加载的。
 *
 * 预加载是介于两者之间的一种方式。 来看看危机中心。
 * 用户第一眼不会看到它。
 * 默认情况下，英雄管理才是第一视图。
 * 为了获得尽可能小的初始加载体积和最快的加载速度，你应该对 AppModule 和 HeroesModule 进行立即加载。
 *
 * 你可以惰性加载危机中心。
 * 但是，你几乎可以肯定用户会在启动应用之后的几分钟内访问危机中心。
 * 理想情况下，应用启动时应该只加载 AppModule 和 HeroesModule，然后几乎立即开始后台加载 CrisisCenterModule。
 * 在用户浏览到危机中心之前，该模块应该已经加载完毕，可供访问了。
 *
 * 这就是预加载。
 *
 * 预加载的工作原理
 * 在每次成功的导航后，路由器会在自己的配置中查找尚未加载并且可以预加载的模块。
 * 是否加载某个模块，以及要加载哪些模块，取决于预加载策略。
 *
 * Router 内置了两种预加载策略：
 * 1.完全不预加载，这是默认值。惰性加载的特性区仍然会按需加载。
 * 2.预加载所有惰性加载的特性区。
 *
 * 默认情况下，路由器或者完全不预加载或者预加载每个惰性加载模块。
 * 路由器还支持自定义预加载策略，以便完全控制要预加载哪些模块以及何时加载。
 *
 * 在下一节，你将会把 CrisisCenterModule 改为默认惰性加载的，
 * 并使用 PreloadAllModules 策略来尽快加载它（以及所有其它惰性加载模块）。
 *
 * 惰性加载危机中心
 * 修改路由配置，来惰性加载 CrisisCenterModule。修改的步骤和配置惰性加载 AdminModule 时一样。
 * 1.把 CrisisCenterRoutingModule 中的路径从 crisis-center 改为空字符串。
 * 2.往 AppRoutingModule 中添加一个 crisis-center 路由。
 * 3.设置 loadChildren 字符串来加载 CrisisCenterModule。
 * 4.从 app.module.ts 中移除所有对 CrisisCenterModule 的引用。
 *
 * @see crisisCenterRoutes
 *
 * 你可以现在尝试它，并确认在点击了“Crisis Center”按钮之后加载了 CrisisCenterModule。
 * 要为所有惰性加载模块启用预加载功能，请从 Angular 的路由模块中导入 PreloadAllModules。
 * RouterModule.forRoot 方法的第二个参数接受一个附加配置选项对象。
 * preloadingStrategy 就是其中之一。
 * 把 PreloadAllModules 添加到 forRoot 调用中：
 * @see AppRoutingModule
 * 这会让 Router 预加载器立即加载所有惰性加载路由（带 loadChildren 属性的路由）。
 * 当访问 http://localhost:3000 时，/heroes 路由立即随之启动，
 * 并且路由器在加载了 HeroesModule 之后立即开始加载 CrisisCenterModule。
 * 意外的是，AdminModule没有预加载，有什么东西阻塞了它。
 *
 * CanLoad 会阻塞预加载
 * PreloadAllModules 策略不会加载被CanLoad守卫所保护的特性区。这是刻意设计的。
 *
 * 你几步之前刚刚给 AdminModule 中的路由添加了 CanLoad 守卫，以阻塞加载那个模块，直到用户认证结束。
 * CanLoad 守卫的优先级高于预加载策略。
 *
 * 如果你要加载一个模块并且保护它防止未授权访问，请移除 canLoad 守卫，只单独依赖CanActivate守卫。
 *
 * 自定义预加载策略
 * 在大多数场景下，预加载每个惰性加载模块就很好了，但是有时候它却并不是正确的选择，特别是在移动设备和低带宽连接下。
 * 你可能出于用户的测量和其它商业和技术因素而选择只对某些特性模块进行预加载。
 *
 * 使用自定义预加载策略，你可以控制路由器预加载哪些路由以及如何加载。
 *
 * 在这一节，你将添加一个自定义策略，它只预加载那些 data.preload 标志为 true 的路由。
 * 回忆一下，你可以往路由的 data 属性中添加任何东西。
 *
 * 在 AppRoutingModule 的 crisis-center 路由中设置 data.preload 标志。
 * @see AppRoutingModule
 *
 * 往项目中添加一个新的名叫 selective-preloading-strategy.ts 的文件，
 * 并在其中定义一个服务类 SelectivePreloadingStrategy，代码如下：
 * @see SelectivePreloadingStrategy
 * SelectivePreloadingStrategy 实现了 PreloadingStrategy，它只有一个方法 preload。
 * 路由器会用两个参数调用调用 preload 方法：
 * 1.要加载的路由。
 * 2.一个加载器（loader）函数，它能异步加载带路由的模块。
 *
 * preload 的实现必须返回一个 Observable。
 * 如果该路由应该预加载，它就会返回调用加载器函数所返回的 Observable。
 * 如果该路由不应该预加载，它就返回一个 null 值的 Observable 对象。
 *
 * 在这个例子中，preload 方法只有在路由的 data.preload 标识为真时才会加载该路由。
 * 它还有一个副作用。 SelectivePreloadingStrategy 会把所选路由的 path 记录在它的公共数组 preloadedModules 中。
 * 很快，你就会扩展 AdminDashboardComponent 来注入该服务，并且显示它的 preloadedModules 数组。
 * 但是首先，要对 AppRoutingModule 做少量修改。
 * 1.把 SelectivePreloadingStrategy 导入到 AppRoutingModule 中。
 * 2.把 PreloadAllModules 策略替换成对 forRoot 的调用，并且传入这个 SelectivePreloadingStrategy。
 * 3.把 SelectivePreloadingStrategy 策略添加到 AppRoutingModule 的 providers 数组中，以便它可以注入到应用中的任何地方。
 * @see AppRoutingModule
 *
 * 现在，编辑 AdminDashboardComponent 以显示这些预加载路由的日志。
 * 1.导入 SelectivePreloadingStrategy（它是一个服务）。
 * 2.把它注入到仪表盘的构造函数中。
 * 3.修改模板来显示这个策略服务的 preloadedModules 数组。
 * @see AdminDashboardComponent
 * 一旦应用加载完了初始路由，CrisisCenterModule 也被预加载了。
 * 通过 Admin 特性区中的记录就可以验证它，“Preloaded Modules”中没有列出 crisis-center。
 * 它也被记录到了浏览器的控制台。
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
