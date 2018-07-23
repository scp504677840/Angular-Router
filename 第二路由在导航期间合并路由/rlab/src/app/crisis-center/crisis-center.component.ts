import {Component, OnInit} from '@angular/core';

/**
 * 第二路由导航：在导航期间合并路由
 * 导航到危机中心并点击“Contact”，你将会在浏览器的地址栏看到如下 URL：
 * http://.../crisis-center(popup:compose)
 * 这个 URL 中有意思的部分是 ... 后面的这些：
 * crisis-center 是主导航。
 * 圆括号包裹的部分是第二路由。
 * 第二路由包括一个出口名称（popup）、一个冒号分隔符和第二路由的路径（compose）。
 *
 * 点击 Heroes 链接，并再次查看 URL：
 * http://.../heroes(popup:compose)
 * 主导航的部分变化了，而第二路由没有变。
 * 路由器在导航树中对两个独立的分支保持追踪，并在 URL 中对这棵树进行表达。
 *
 * 你还可以添加更多出口和更多路由（无论是在顶层还是在嵌套的子层）来创建一个带有多个分支的导航树。 路由器将会生成相应的 URL。
 *
 * 通过像前面那样填充 outlets 对象，你可以告诉路由器立即导航到一棵完整的树。
 * 然后把这个对象通过一个链接参数数组传给 router.navigate 方法。
 *
 * 有空的时候你可以自行试验这些可能性。
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
