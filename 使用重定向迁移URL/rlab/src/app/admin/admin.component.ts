import {Component, OnInit} from '@angular/core';

/**
 * 使用重定向迁移 URL
 * 你已经设置好了路由，并且用命令式和声明式的方式导航到了很多不同的路由。
 * 但是，任何应用的需求都会随着时间而改变。
 * 你把链接 /heroes 和 hero/:id 指向了 HeroListComponent 和 HeroDetailComponent 组件。
 * 如果有这样一个需求，要把链接 heroes 变成 superheroes，你仍然希望以前的 URL 能正常导航。
 * 但你也不想在应用中找到并修改每一个链接，这时候，重定向就可以省去这些琐碎的重构工作。
 *
 * 把 /heroes 修改为 /superheros
 * 先取得 Hero 路由，并把它们迁移到新的 URL。
 * Router（路由器）会在开始导航之前先在配置中检查所有重定向语句，以便将来按需触发重定向。
 * 要支持这种修改，你就要在 heroes-routing.module 文件中把老的路由重定向到新的路由。
 * @see HeroesRoutingModule
 * 注意，这里有两种类型的重定向。
 * 第一种是不带参数的从 /heroes 重定向到 /superheroes。这是一种非常直观的重定向。
 * 第二种是从 /hero/:id 重定向到 /superhero/:id，它还要包含一个 :id 路由参数。
 * 路由器重定向时使用强大的模式匹配功能，这样，路由器就会检查 URL，
 * 并且把 path 中带的路由参数替换成相应的目标形式。
 * 以前，你导航到形如 /hero/15 的 URL 时，带了一个路由参数 id，它的值是 15。
 *
 * 在重定向的时候，路由器还支持查询参数和片段(fragment)。
 * 当使用绝对地址重定向时，路由器将会使用路由配置的 redirectTo 属性中规定的查询参数和片段。
 * 当使用相对地址重定向时，路由器将会使用源地址（跳转前的地址）中的查询参数和片段。
 *
 * 在修改 app-routing.module.ts 之前，你要先考虑一条重要的规则。
 * 目前，你把空路径路由重定向到了 /heroes，它又被重定向到了 /superheroes。
 * 这样不行，从设计上就不行。
 * 因为路由器在每一层的路由配置中只会处理一次重定向。
 * 这样可以防止出现无限循环的重定向。
 *
 * 所以，你要在 app-routing.module.ts 中修改空路径路由，让它重定向到 /superheroes。
 * @see AppRoutingModule
 *
 * 由于 RouterLink 指令没有关联到路由配置，所以你需要修改相关的路由链接，
 * 以便在新的路由激活时，它们也能保持激活状态。你要修改 app.component.ts 模板中的 /heroes 路由链接。
 * @see src/app/app.component.html
 * 当这些重定向设置好之后，所有以前的路由都指向了它们的新目标，并且每个 URL 也仍然能正常工作。
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
