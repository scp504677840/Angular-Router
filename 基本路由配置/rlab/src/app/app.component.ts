import { Component } from '@angular/core';

/**
 * 路由与导航
 * 在用户使用应用程序时，Angular 的路由器能让用户从一个视图导航到另一个视图。
 *
 * 概览
 * 浏览器具有熟悉的导航模式：
 * 1.在地址栏输入 URL，浏览器就会导航到相应的页面。
 * 2.在页面中点击链接，浏览器就会导航到一个新页面。
 * 3.点击浏览器的前进和后退按钮，浏览器就会在你的浏览历史中向前或向后导航。
 *
 * Angular 的 Router（即“路由器”）借鉴了这个模型。
 * 它把浏览器中的 URL 看做一个操作指南，
 * 据此导航到一个由客户端生成的视图，并可以把参数传给支撑视图的相应组件，
 * 帮它决定具体该展现哪些内容。
 * 你可以为页面中的链接绑定一个路由，这样，当用户点击链接时，就会导航到应用中相应的视图。
 * 当用户点击按钮、从下拉框中选取，或响应来自任何地方的事件时，你也可以在代码控制下进行导航。
 * 路由器还在浏览器的历史日志中记录下这些活动，这样浏览器的前进和后退按钮也能照常工作。
 *
 * 基础知识
 * 本章包括一系列里程碑，从一个单模块、两个页面的简单程序逐步走向带有多个子路由的多视图设计。
 * 先对路由的一些核心概念做一个介绍，它能帮你逐步过渡到细节。
 *
 * <base href> 元素
 * 大多数带路由的应用都要在index.html的 <head> 标签下先添加一个 <base> 元素，来告诉路由器该如何合成导航用的 URL。
 * 如果 app 文件夹是该应用的根目录（就像范例应用中一样），那就把 href 的值设置为下面这样：
 * <base href="/">
 *
 * 配置
 * 每个带路由的 Angular 应用都有一个Router（路由器）服务的单例对象。
 * 当浏览器的 URL 变化时，路由器会查找对应的 Route（路由），并据此决定该显示哪个组件。
 *
 * 路由器需要先配置才会有路由信息。
 * 下面的例子创建了四个路由定义，并用 RouterModule.forRoot 方法来配置路由器，
 * 并把它的返回值添加到 AppModule 的 imports 数组中。
 * const appRoutes: Routes = [
 * { path: 'crisis-center', component: CrisisListComponent },
 * { path: 'hero/:id',      component: HeroDetailComponent },
 * {
 *    path: 'heroes',
 *    component: HeroListComponent,
 *    data: { title: 'Heroes List' }
 *  },
 * { path: '',
 *    redirectTo: '/heroes',
 *    pathMatch: 'full'
 *  },
 * { path: '**', component: PageNotFoundComponent }
 * ];
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot(
 *       appRoutes,
 *       { enableTracing: true } // <-- debugging purposes only
 *     )
 *     // other imports here
 *   ],
 *   ...
 * })
 *  export class AppModule { }
 * 这里的路由数组 appRoutes 描述如何进行导航。
 * 把它传给 RouterModule.forRoot 方法并传给本模块的 imports 数组就可以配置路由器。
 *
 * 每个 Route 都会把一个 URL 的 path 映射到一个组件。
 * 注意，path 不能以斜杠（/）开头。
 * 路由器会为解析和构建最终的 URL，这样当你在应用的多个视图之间导航时，可以任意使用相对路径和绝对路径。
 *
 * 第二个路由中的 :id 是一个路由参数的令牌(Token)。
 * 比如 /hero/42 这个 URL 中，“42”就是 id 参数的值。
 * 此 URL 对应的 HeroDetailComponent 组件将据此查找和展现 id 为 42 的英雄。
 * 在本章中稍后的部分，你将会学习关于路由参数的更多知识。
 *
 * 第三个路由中的 data 属性用来存放于每个具体路由有关的任意信息。
 * 该数据可以被任何一个激活路由访问，并能用来保存诸如 页标题、面包屑以及其它静态只读数据。
 * 本章稍后的部分，你将使用resolve 守卫来获取动态数据。
 *
 * 第四个路由中的空路径（''）表示应用的默认路径，
 * 当 URL 为空时就会访问那里，因此它通常会作为起点。
 * 这个默认路由会重定向到 URL /heroes，并显示 HeroesListComponent。
 *
 * 最后一个路由中的 ** 路径是一个通配符。
 * 当所请求的 URL 不匹配前面定义的路由表中的任何路径时，路由器就会选择此路由。
 * 这个特性可用于显示“404 - Not Found”页，或自动重定向到其它路由。
 *
 * 这些路由的定义顺序是刻意如此设计的。
 * 路由器使用先匹配者优先的策略来匹配路由，所以，具体路由应该放在通用路由的前面。
 * 在上面的配置中，带静态路径的路由被放在了前面，后面是空路径路由，因此它会作为默认路由。
 * 而通配符路由被放在最后面，这是因为它能匹配上每一个 URL，因此应该只有在前面找不到其它能匹配的路由时才匹配它。
 *
 * 如果你想要看到在导航的生命周期中发生过哪些事件，
 * 可以使用路由器默认配置中的 enableTracing 选项。
 * 它会把每个导航生命周期中的事件输出到浏览器的控制台。
 * 这应该只用于调试。
 * 你只需要把 enableTracing: true 选项作为第二个参数传给 RouterModule.forRoot() 方法就可以了。
 *
 * 路由出口
 * 有了这份配置，当本应用在浏览器中的 URL 变为 /heroes 时，
 * 路由器就会匹配到 path 为 heroes 的 Route，并在宿主视图中的RouterOutlet之后显示 HeroListComponent 组件。
 * <router-outlet></router-outlet>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
