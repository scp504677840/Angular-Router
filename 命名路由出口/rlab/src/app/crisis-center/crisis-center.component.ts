import {Component, OnInit} from '@angular/core';

/**
 * 用命名出口（outlet）显示多重路由
 * 你决定给用户提供一种方式来联系危机中心。
 * 当用户点击“Contact”按钮时，你要在一个弹出框中显示一条消息。
 *
 * 即使在应用中的不同页面之间切换，这个弹出框也应该始终保持打开状态，直到用户发送了消息或者手动取消。
 * 显然，你不能把这个弹出框跟其它放到页面放到同一个路由出口中。
 *
 * 迄今为止，你只定义过单路由出口，并且在其中嵌套了子路由以便对路由分组。
 * 在每个模板中，路由器只能支持一个无名主路由出口。
 *
 * 模板还可以有多个命名的路由出口。
 * 每个命名出口都自己有一组带组件的路由。
 * 多重出口可以在同一时间根据不同的路由来显示不同的内容。
 *
 * 在 AppComponent 中添加一个名叫“popup”的出口，就在无名出口的下方。
 * <router-outlet></router-outlet>
 * <router-outlet name="popup"></router-outlet>
 *
 * 一旦你学会了如何把一个弹出框组件路由到该出口，那里就是将会出现弹出框的地方。
 *
 * 第二路由
 * 命名出口是第二路由的目标。
 * 第二路由很像主路由，配置方式也一样。它们只有一些关键的不同点：
 * 1.它们彼此互不依赖。
 * 2.它们与其它路由组合使用。
 * 3.它们显示在命名出口中。
 * 在 src/app/compose-message.component.ts 中创建一个名叫 ComposeMessageComponent 的新组件。
 * 它显示一个简单的表单，包括一个头、一个消息输入框和两个按钮：“Send”和“Cancel”。
 * @see ComposeMessageComponent
 * 它看起来几乎和你以前见过其它组件一样，但有两个值得注意的区别。
 * 主要 send() 方法在发送消息和关闭弹出框之前通过等待模拟了一秒钟的延迟。
 * closePopup() 方法用把 popup 出口导航到 null 的方式关闭了弹出框。 这个奇怪的用法在稍后的部分有讲解。
 * 像其它组件一样，你还要把 ComposeMessageComponent 添加到 AppModule 的 declarations 中。
 *
 * 添加第二路由
 * 打开 AppRoutingModule，并把一个新的 compose 路由添加到 appRoutes 中。
 * {
 *    path: 'compose',
 *    component: ComposeMessageComponent,
 *    outlet: 'popup'
 * }
 * 对 path 和 component 属性应该很熟悉了吧。
 * 注意这个新的属性 outlet 被设置成了 'popup'。
 * 这个路由现在指向了 popup 出口，而 ComposeMessageComponent 也将显示在那里。
 * 用户需要某种途径来打开这个弹出框。 打开 AppComponent，并添加一个“Contact”链接。
 * <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
 *
 * 虽然 compose 路由被钉死在了 popup 出口上，
 * 但这仍然不足以向 RouterLink 指令表明要加载该路由。
 * 你还要在链接参数数组中指定这个命名出口，并通过属性绑定的形式把它绑定到 RouterLink 上。
 *
 * 链接参数数组包含一个只有一个 outlets 属性的对象，
 * 它的值是另一个对象，这个对象以一个或多个路由的出口名作为属性名。
 * 在这里，它只有一个出口名“popup”，它的值则是另一个链接参数数组，用于指定 compose 路由。
 *
 * 意思是，当用户点击此链接时，在路由出口 popup 中显示与 compose 路由相关联的组件。
 *
 * 当有且只有一个无名出口时，外部对象中的这个 outlets 对象并不是必须的。
 * 路由器假设这个路由指向了无名的主出口，并为你创建这些对象。
 * 路由到一个命名出口就会揭示一个以前被隐藏的真相： 你可以在同一个 RouterLink 指令中为多个路由出口指定多个路由。
 * 这里你实际上没能这样做。要想指向命名出口，你就得使用一种更强大也更啰嗦的语法。
 */
@Component({
  selector: 'app-crisis-center',
  templateUrl: './crisis-center.component.html',
  styleUrls: ['./crisis-center.component.css']
})
export class CrisisCenterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
