import {Component, OnInit} from '@angular/core';

/**
 * CanDeactivate：处理未保存的更改
 * 回到“Heroes”工作流，该应用毫不犹豫的接受对英雄的任何修改，不作任何校验。
 * 在现实世界中，你得先把用户的改动积累起来。
 * 你可能不得不进行跨字段的校验，可能要找服务器进行校验，
 * 可能得把这些改动保存成一种待定状态，直到用户或者把这些改动作为一组进行确认或撤销所有改动。
 *
 * 当用户要导航到外面时，该怎么处理这些既没有审核通过又没有保存过的改动呢？
 * 你不能马上离开，不在乎丢失这些改动的风险，那显然是一种糟糕的用户体验。
 *
 * 最好能暂停，并让用户决定该怎么做。
 * 如果用户选择了取消，你就留下来，并允许更多改动。
 * 如果用户选择了确认，那就进行保存。
 *
 * 在保存成功之前，你还可以继续推迟导航。
 * 如果你让用户立即移到下一个界面，而保存却失败了（可能因为数据不符合有效性规则），你就会丢失该错误的上下文环境。
 *
 * 在等待服务器的答复时，你没法阻塞它 —— 这在浏览器中是不可能的。
 * 你只能用异步的方式在等待服务器答复之前先停止导航。
 *
 * 你需要 CanDeactivate 守卫。
 *
 * 取消与保存
 * 这个范例应用不会与服务器通讯。 幸运的是，你有另一种方式来演示异步的路由器钩子。
 * 用户在 CrisisDetailComponent 中更新危机信息。
 * 与 HeroDetailComponent 不同，用户的改动不会立即更新危机的实体对象。
 * 当用户按下了 Save 按钮时，应用就更新这个实体对象；如果按了 Cancel 按钮，那就放弃这些更改。
 *
 * 这两个按钮都会在保存或取消之后导航回危机列表。
 *
 * 如果用户尝试不保存或撤销就导航到外面该怎么办？
 * 用户可以按浏览器的后退按钮，或点击英雄的链接。
 * 这些操作都会触发导航。本应用应该自动保存或取消吗？
 *
 * 都不行。应用应该弹出一个确认对话框来要求用户明确做出选择，该对话框会用异步的方式等用户做出选择。
 *
 * 你也能用同步的方式等用户的答复，阻塞代码。
 * 但如果能用异步的方式等待用户的答复，应用就会响应性更好，也能同时做别的事。
 * 异步等待用户的答复和等待服务器的答复是类似的。
 *
 * DialogService（为了在应用级使用，已经注入到了 AppModule）就可以做到这些。
 * 它返回promise，当用户最终决定了如何去做时，它就会被解析 —— 或者决定放弃更改直接导航离开（true），
 * 或者保留未完成的修改，留在危机编辑器中（false）。
 *
 * 创建了一个 Guard，它将检查这个（任意）组件中是否有 canDeactivate() 函数。
 * CrisisDetailComponent 就会有这个方法。
 * 但是该守卫并不需要知道 CrisisDetailComponent 确认退出激活状态的详情。
 * 它只需要检查该组件是否有一个 canDeactivate() 方法，并调用它。
 * 这就让该守卫可以复用。
 * @see CanDeactivateGuardService
 *
 * 看看 CrisisDetailComponent 组件，它已经实现了对未保存的更改进行确认的工作流。
 * @see CrisisDetailComponent.canDeactivate
 *
 * 注意，canDeactivate 方法可以同步返回，如果没有危机，或者没有未定的修改，它就立即返回 true。
 * 但是它也可以返回一个承诺（Promise）或可观察对象（Observable），
 * 路由器将等待它们被解析为真值（继续导航）或假值（留下）。
 *
 * 往 crisis-center.routing.module.ts 的危机详情路由中用 canDeactivate 数组添加一个 Guard（守卫）。
 * @see crisisCenterRoutes
 *
 * 还要把这个 Guard 添加到 AppRoutingModule 的 providers 中去，以便 Router 可以在导航过程中注入它。
 * @see AppRoutingModule
 *
 * 现在，你已经给了用户一个能保护未保存更改的安全守卫。
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
