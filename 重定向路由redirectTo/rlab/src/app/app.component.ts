import {Component} from '@angular/core';

/**
 * 本章要讲的是如何开发一个带路由的多页面应用。
 * 接下来会重点讲它的设计决策，并描述路由的关键特性，比如：
 * 把应用的各个特性组织成模块。
 * 导航到组件（Heroes 链接到“英雄列表”组件）。
 * 包含一个路由参数（当路由到“英雄详情”时，把该英雄的 id 传进去）。
 * 子路由（危机中心特性有一组自己的路由）。
 * CanActivate 守卫（检查路由的访问权限）。
 * CanActivateChild 守卫（检查子路由的访问权限）。
 * CanDeactivate 守卫（询问是否丢弃未保存的更改）。
 * Resolve 守卫（预先获取路由数据）。
 * 惰性加载特性模块。
 * CanLoad 守卫（在加载特性模块之前进行检查）。
 *
 * 定义路由
 * 路由器必须用“路由定义”的列表进行配置。
 * 第一个配置中定义了由两个路由构成的数组，它们分别通过路径(path)导航到了 CrisisListComponent 和 HeroListComponent 组件。
 * 每个定义都被翻译成了一个Route对象。
 * 该对象有一个 path 字段，表示该路由中的 URL 路径部分，和一个 component 字段，表示与该路由相关联的组件。
 * 当浏览器的 URL 变化时或在代码中告诉路由器导航到一个路径时，路由器就会翻出它用来保存这些路由定义的注册表。
 * 直白的说，你可以这样解释第一个路由：
 * 当浏览器地址栏的 URL 变化时，
 * 如果它匹配上了路径部分 /crisis-center，路由器就会激活一个 CrisisListComponent 的实例，并显示它的视图。
 * 当应用程序请求导航到路径 /crisis-center 时，
 * 路由器激活一个 CrisisListComponent 的实例，显示它的视图，并将该路径更新到浏览器地址栏和历史。
 *
 * 下面是第一个配置。
 * 把路由数组传递到 RouterModule.forRoot 方法，
 * 该方法返回一个包含已配置的 Router 服务提供商模块和一些其它路由包需要的服务提供商。
 * 应用启动时，Router 将在当前浏览器 URL 的基础上进行初始导航。
 *
 * 路由出口
 * RouterOutlet 是一个来自路由库的组件。
 * 路由器会在 <router-outlet> 标签中显示视图。
 * 路由器会把 <router-outlet> 元素添加到了 DOM 中，紧接着立即在这个 <router-outlet> 之后插入导航到的视图元素。
 *
 * routerLink 绑定
 * 在出口上方的 A 标签中，有一个绑定 RouterLink 指令的属性绑定，就像这样：routerLink="..."。
 * 例子中的每个链接都有一个字符串型的路径，也就是你以前配置过的路由路径，但还没有指定路由参数。
 * 你还可以通过提供查询字符串参数为 RouterLink 提供更多情境信息，
 * 或提供一个 URL 片段（Fragment 或 hash）来跳转到本页面中的其它区域。
 * 查询字符串可以由 [queryParams] 绑定来提供，
 * 它需要一个对象型参数（如 { name: 'value' }），而 URL 片段需要一个绑定到 [fragment] 的单一值。
 *
 * routerLinkActive 绑定
 * 每个 A 标签还有一个到 RouterLinkActive 指令的属性绑定，就像 routerLinkActive="..."。
 * 等号（=）右侧的模板表达式包含用空格分隔的一些 CSS 类。
 * 当路由激活时路由器就会把它们添加到此链接上（反之则移除）。
 * 你还可以把 RouterLinkActive 指令绑定到一个 CSS 类组成的数组，如 [routerLinkActive]="['...']"。
 * RouterLinkActive 指令会基于当前的 RouterState 对象来为激活的 RouterLink 切换 CSS 类。
 * 这会一直沿着路由树往下进行级联处理，所以父路由链接和子路由链接可能会同时激活。
 * 要改变这种行为，可以把 [routerLinkActiveOptions] 绑定到 {exact: true} 表达式。
 * 如果使用了 { exact: true }，那么只有在其 URL 与当前 URL 精确匹配时才会激活指定的 RouterLink。
 *
 * 通配符路由
 * 你以前在应用中创建过两个路由，一个是 /crisis-center，另一个是 /heroes。
 * 所有其它 URL 都会导致路由器抛出错误，并让应用崩溃。
 *
 * 可以添加一个通配符路由来拦截所有无效的 URL，并优雅的处理它们。
 * 通配符路由的 path 是两个星号（**），它会匹配任何 URL。
 * 当路由器匹配不上以前定义的那些路由时，它就会选择这个路由。
 * 通配符路由可以导航到自定义的“404 Not Found”组件，也可以重定向到一个现有路由。
 *
 * 路由器使用先匹配者优先的策略来选择路由。 通配符路由是路由配置中最没有特定性的那个，因此务必确保它是配置中的最后一个路由。
 *
 * 把默认路由设置为英雄列表
 * 应用启动时，浏览器地址栏中的初始 URL 是这样的：
 * localhost:4200
 * 它不能匹配上任何具体的路由，于是就会走到通配符路由中去，并且显示 PageNotFoundComponent。
 * 这个应用需要一个有效的默认路由，在这里应该用英雄列表作为默认页。
 * 当用户点击"Heroes"链接或把 localhost:4200/heroes 粘贴到地址栏时，它应该导航到列表页。
 *
 * 重定向路由
 * 首选方案是添加一个 redirect 路由来把最初的相对路径（''）转换成期望的默认路径（/heroes）。
 * 浏览器地址栏会显示 .../heroes，就像你直接导航到那里一样。
 * 在通配符路由上方添加一个默认路由。
 * { path: '',   redirectTo: '/heroes', pathMatch: 'full' }
 * 重定向路由需要一个 pathMatch 属性，来告诉路由器如何用 URL 去匹配路由的路径，否则路由器就会报错。
 * 在本应用中，路由器应该只有在完整的 URL等于 '' 时才选择 HeroListComponent 组件，因此要把 pathMatch 设置为 'full'。
 *
 * 从技术角度说，pathMatch = 'full' 导致 URL 中剩下的、未匹配的部分必须等于 ''。
 * 在这个例子中，跳转路由在一个顶级路由中，因此剩下的URL 和完整的URL 是一样的。
 *
 * pathMatch 的另一个可能的值是 'prefix'，
 * 它会告诉路由器：当剩下的URL 以这个跳转路由中的 prefix 值开头时，就会匹配上这个跳转路由。
 *
 * 在这里不能这么做！如果 pathMatch 的值是 'prefix'，那么每个URL 都会匹配上 ''。
 *
 * 尝试把它设置为 'prefix'，
 * 然后点击 Go to sidekicks 按钮。
 * 别忘了，它是一个无效 URL，本应显示“Page not found”页。
 * 但是，你仍然在“英雄列表”页中。在地址栏中输入一个无效的 URL，你又被路由到了 /heroes。
 * 每一个 URL，无论有效与否，都会匹配上这个路由定义。
 *
 * 默认路由应该只有在整个URL 等于 '' 时才重定向到 HeroListComponent，别忘了把重定向路由设置为 pathMatch = 'full'。
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
