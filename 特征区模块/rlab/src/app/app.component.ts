import {Component} from '@angular/core';

/**
 * 英雄特征区
 * 你刚刚学习了如何用 RouterLink 指令进行导航。接下来要：
 * 1.用模块把应用和路由组织为一些特性区
 * 2.命令式的从一个组件导航到另一个
 * 3.通过路由传递必要信息和可选信息
 *
 * 典型的应用具有多个特性区，每个特性区都专注于特定的业务用途。
 * 虽然你也可以把文件都放在 src/app/ 目录下，但那样是不现实的，而且很难维护。
 * 大部分开发人员更喜欢把每个特性区都放在它自己的目录下。
 *
 * 你准备把应用拆分成多个不同的特性模块，每个特有模块都有自己的关注点。
 * 然后，你就会把它们导入到主模块中，并且在它们之间导航。
 *
 * 英雄特性区的路由需求
 * “英雄”特性有两个相互协作的组件，列表和详情。
 * 列表视图是自给自足的，你导航到它，它会自行获取英雄列表并显示他们。
 *
 * 详情视图就不同了。它要显示一个特定的英雄，但是它本身却无法知道显示哪一个，此信息必须来自外部。
 *
 * 当用户从列表中选择了一个英雄时，应用就导航到详情页以显示那个英雄。
 * 通过把所选英雄的 id 编码进路由的 URL 中，就能告诉详情视图该显示哪个英雄。
 *
 * 英雄特性区的路由配置
 * 在 heroes 目录下创建一个新的 heroes-routing.module.ts 文件，使用的技术和以前创建 AppRoutingModule 时的一样。
 * @see HeroesRoutingModule
 *
 * 把路由模块文件和它对应的模块文件放在同一个目录下。
 * 比如这里的 heroes-routing.module.ts 和 heroes.module.ts 都位于 src/app/heroes 目录下。
 * 考虑为每个功能模块提供自己的路由配置文件。
 * 当特征路线很简单时，它可能看起来像是过度复杂。
 * 但是，路线趋向于变得更加复杂，并且模式的一致性会随着时间的推移而得到回报。
 *
 * 从新位置 src/app/heroes/ 目录中导入英雄相关的组件，定义两个“英雄管理”路由，并导出 HeroRoutingModule 类。
 * 现在，你有了 Heroes 模块的路由，还得在 RouterModule 中把它们注册给路由器，和 AppRoutingModule 中的做法几乎完全一样。
 * 这里有少量但是关键的不同点。
 * 在 AppRoutingModule 中，你使用了静态的 RouterModule.forRoot方法来注册路由和全应用级服务提供商。
 * 在特性模块中，你要改用forChild静态方法。
 *
 * 只在根模块 AppRoutingModule 中调用 RouterModule.forRoot
 * （如果在 AppModule 中注册应用的顶级路由，那就在 AppModule 中调用）。
 * 在其它模块中，你就必须调用RouterModule.forChild方法来注册附属路由。
 *
 * 把路由模块添加到 HeroesModule 中
 * 把 HeroRoutingModule 添加到 HeroModule 中，就像为 AppModule 添加 AppRoutingModule 一样。
 * 打开 heroes.module.ts，
 * 从 heroes-routing.module.ts 中导入 HeroRoutingModule 并把它添加到 HeroesModule 的 imports 数组中。
 * 写完后的 HeroesModule 是这样的：
 * @see HeroesModule
 *
 * 移除重复的“英雄管理”路由
 * 英雄类的路由目前定义在两个地方：HeroesRoutingModule 中（并最终给 HeroesModule）和 AppRoutingModule 中。
 * 由特性模块提供的路由会被路由器再组合上它们所导入的模块的路由。
 * 这让你可以继续定义特性路由模块中的路由，而不用修改主路由配置。
 * 但你显然不希望把同一个路由定义两次，那就移除 HeroListComponent 的导入和来自 app-routing.module.ts 中的 /heroes 路由。
 *
 * 保留默认路由和通配符路由！ 它们是应用程序顶层该自己处理的关注点。
 * @see AppRoutingModule
 *
 * 把“英雄管理”模块导入到 AppModule
 * 英雄这个特性模块已经就绪，但应用仍然不知道 HeroesModule 的存在。 打开 app.module.ts，并按照下述步骤修改它。
 *
 * 导入 HeroesModule 并且把它加到根模块 AppModule 的 @NgModule 元数据中的 imports 数组中。
 *
 * 从 AppModule 的 declarations 中移除 HeroListComponent，因为它现在已经改由 HeroesModule 提供了。
 * 这一步很重要！因为一个组件只能声明在一个属主模块中。
 * 这个例子中，Heroes 模块就是 Heroes 组件的属主模块，而 AppModule 要通过导入 HeroesModule 才能使用这些组件。
 *
 * 最终，AppModule 不再了解那些特定于“英雄”特性的知识，比如它的组件、路由细节等。
 * 你可以让“英雄”特性独立演化，添加更多的组件或各种各样的路由。
 * 这就是为每个特性区创建独立模块后获得的核心优势。
 *
 * 经过这些步骤，AppModule 变成了这样：
 * @see AppModule
 *
 * 看看该模块的 imports 数组。注意，AppRoutingModule 是最后一个。最重要的是，它位于 HeroesModule 之后。
 * imports: [
 *    BrowserModule,
 *    FormsModule,
 *    HeroesModule,
 *    AppRoutingModule
 * ],
 * 路由配置的顺序很重要。
 * 路由器会接受第一个匹配上导航所要求的路径的那个路由。
 * 当所有路由都在同一个 AppRoutingModule 时，
 * 你要把默认路由和通配符路由放在最后（这里是在 /heroes 路由后面），
 * 这样路由器才有机会匹配到 /heroes 路由，否则它就会先遇到并匹配上该通配符路由，并导航到“页面未找到”路由。
 *
 * 这些路由不再位于单一文件中。他们分布在两个不同的模块中：AppRoutingModule 和 HeroesRoutingModule。
 *
 * 每个路由模块都会根据导入的顺序把自己的路由配置追加进去。
 * 如果你先列出了 AppRoutingModule，那么通配符路由就会被注册在“英雄管理”路由之前。
 * 通配符路由（它匹配任意URL）将会拦截住每一个到“英雄管理”路由的导航，因此事实上屏蔽了所有“英雄管理”路由。
 *
 * 反转路由模块的导入顺序，你就会看到当点击英雄相关的链接时被导向了“页面未找到”路由。
 * 要学习如何在运行时查看路由器配置，参见稍后的内容。
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
