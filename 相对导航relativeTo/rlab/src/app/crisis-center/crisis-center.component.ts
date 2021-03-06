import {Component, OnInit} from '@angular/core';

/**
 * 相对导航
 * 虽然构建出了危机中心特性区，你却仍在使用以斜杠开头的绝对路径来导航到危机详情的路由。
 * 路由器会从路由配置的顶层来匹配像这样的绝对路径。
 * 你固然可以继续像危机中心特性区一样使用绝对路径，但是那样会把链接钉死在特定的父路由结构上。
 * 如果你修改了父路径 /crisis-center，那就不得不修改每一个链接参数数组。
 *
 * 通过改成定义相对于当前 URL 的路径，你可以把链接从这种依赖中解放出来。
 * 当你修改了该特性区的父路由路径时，该特性区内部的导航仍然完好无损。
 * 例子如下：
 * 路由器支持在链接参数数组中使用“目录式”语法来为查询路由名提供帮助：
 * ./ 或 无前导斜线 形式是相对于当前级别的。
 * ../ 会回到当前路由路径的上一级。
 * 你可以把相对导航语法和一个祖先路径组合起来用。
 * 如果不得不导航到一个兄弟路由，你可以用 ../<sibling> 来回到上一级，然后进入兄弟路由路径中。
 *
 * 用 Router.navigate 方法导航到相对路径时，你必须提供当前的 ActivatedRoute，来让路由器知道你现在位于路由树中的什么位置。
 * 在链接参数数组中，添加一个带有 relativeTo 属性的对象，并把它设置为当前的 ActivatedRoute。
 * 这样路由器就会基于当前激活路由的位置来计算出目标 URL。
 *
 * 当调用路由器的 navigateByUrl 时，总是要指定完整的绝对路径。
 *
 * 使用相对 URL 导航到危机列表
 * 你已经注入过了 ActivatedRoute，你需要把它来和相对导航路径组合在一起。
 * 如果用 RouterLink 来代替 Router 服务进行导航，就要使用相同的链接参数数组，
 * 不过不再需要提供 relativeTo 属性。
 * ActivatedRoute 已经隐含在了 RouterLink 指令中。
 * 修改 CrisisDetailComponent 的 gotoCrises 方法，来使用相对路径返回危机中心列表。
 * @see CrisisDetailComponent.gotoCrises
 * 注意这个路径使用了 ../ 语法返回上一级。
 * 如果当前危机的 id 是 3，那么最终返回到的路径就是 /crisis-center/;id=3;foo=foo。
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
