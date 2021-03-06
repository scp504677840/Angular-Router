import {Component, OnInit} from '@angular/core';

/**
 * 清除第二路由
 * 正如你刚刚学到的，除非导航到新的组件，否则路由出口中的组件会始终存在。 这里涉及到的第二出口也同样如此。
 *
 * 每个第二出口都有自己独立的导航，跟主出口的导航彼此独立。
 * 修改主出口中的当前路由并不会影响到 popup 出口中的。
 * 这就是为什么在危机中心和英雄管理之间导航时，弹出框始终都是可见的。
 *
 * 点击“send”或“cancel”按钮，则会清除弹出框视图。
 * 为何如此？再看看 closePopup() 方法：
 * closePopup() {
 *    this.router.navigate([{ outlets: { popup: null }}]);
 * }
 * 它使用 Router.navigate() 方法进行强制导航，并传入了一个链接参数数组。
 *
 * 就像在 AppComponent 中绑定到的 Contact RouterLink 一样，
 * 它也包含了一个带 outlets 属性的对象。
 * outlets 属性的值是另一个对象，该对象用一些出口名称作为属性名。 唯一的命名出口是 'popup'。
 *
 * 但这次，'popup' 的值是 null。
 * null 不是一个路由，但却是一个合法的值。
 * 把 popup 这个 RouterOutlet 设置为 null 会清除该出口，
 * 并且从当前 URL 中移除第二路由 popup。
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
