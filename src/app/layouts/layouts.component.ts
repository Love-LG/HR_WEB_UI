import { Component, OnInit, TemplateRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { ToolsService } from 'src/app/share/service/tools.service';
import { filter } from 'rxjs/operators';
import { NzSubMenuComponent } from 'ng-zorro-antd';
import { TabRouterService } from './tab-router/tab-router.service';
export interface MenuItem {
	title: string;
	toostip?: string;
	route?: string;
	id?: string; // 有children元素的menu的id , 无childrensubmenu或submenu无id
	icon?: string;
	exponded?: boolean; // 控制 有children的节点的展开状态
	active?: boolean; //  控制 有children的节点的激活状态
	children?: Array<MenuItem>;
	permmission?: string;
	// 后台返回的数据结构
	accessId?: number;
	rightName?: string;
	parentId?: string;
	url?: string;
	description?: string;
}

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'sj-layouts',
	templateUrl: './layouts.component.html',
	styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit, AfterViewInit {
	activeUrl: string = this.router.routerState.snapshot.url;
	navigationEnd: {} = {
		id: null,
		url: this.activeUrl,  // 添加默认属性值
		urlAfterRedirects: ''
	};
	menuList: Array<MenuItem> = [];
	isCollapsed = false;

	private _submenuRefMap: Map<string, NzSubMenuComponent> = new Map<string, NzSubMenuComponent>();
	private _currentId = null; // 用于收缩后记住点击的submenu所在的menu的id
	constructor(
		private tools: ToolsService,
		public router: Router,
		private tabSvr: TabRouterService
	) {
		this.menuList = [
			{
				id: this.tools.isGuid(7),
				title: 'Home-Page',
				exponded: false,
				active: false,
				route: '/emas/home',
			},
			{
				id: this.tools.isGuid(7),
				title: 'House-Management',
				exponded: false,
				active: false,
				route: '/emas/house-management',
			},
			{
				id: this.tools.isGuid(7),
				title: 'User-Management',
				exponded: false,
				active: false,
				route: '/emas/user-management',
			},
		];
		// let pList = JSON.parse(localStorage.getItem('p_list'));
		// pList = pList ? pList : [];
		// this.menuList = this.menuList.filter(menu => {
		// 	for (const permmission of pList) {
		// 		if (menu.title === permmission.name || menu.permmission === permmission.name  ) {
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// });

	}

	// 控制 有children的节点的展开状态
	expandMenu(current: number, type: 'one' | 'two', twoIndex?: number) {
		// console.log(current);
		// console.log(nzMenuCom);
		// console.log(isChild);
		// 1. 点击子菜单就跳路由版本,手风琴模式
        /* this.menuList.forEach((menu, i) => {
            if (menu.exponded !== undefined) {
                if (i === current) {
                    menu.active = true;
                    if (!isChild) {
                        menu.exponded = !menu.exponded;
                    } else {
						menu.exponded = true;
						// 这里有坑, 虽然nzSubmenu的open属性已变为false,但展开侧边栏后,nzSubmenu会恢复之前展开状态,随后展开状态不在受exponded属性控制,原因暂不明,解决办法在下面
                        if (this.isCollapsed) {
                            // 收缩状态下才记录
                            this._currentId = menu.id;
                        }
                    }
                    // 保存点击过的submenu的component ref
                    const key = menu.id;
                    if (!this._submenuRefMap.has(key)) {
                        this._submenuRefMap.set(key, nzMenuCom);
                    }
                } else {
                    menu.exponded = false;
                    menu.active = false;
                }
            }
        }); */
		// 2. 点击菜单不会跳路由,非手风琴模式
		// tslint:disable-next-line:no-shadowed-variable
		this.menuList.forEach((menu, i) => {
			if (i === current) {
				// 如果是当前点击的节点
				// 菜单收缩取消active
				if (menu.exponded === true) {
					menu.active = false;
				}
				if (menu.exponded !== undefined) {
					if (type === 'one') {
						// 非子项,只控制菜单收缩
						menu.exponded = !menu.exponded;
					} else if (type === 'two') {
						// 子项保证菜单展开,并且控制active,这里注释掉代码是因为_setActiveRouter已经干了这个事情了
						// menu.active = true;
						// menu.exponded = true;
						menu.children[twoIndex].exponded = !menu.children[twoIndex].exponded;
					}
				}
			}
			// 下面的工作已由 _setActiveRouter替代
            /* else {
				if (isChild || this.menuList[current].exponded === undefined) {
					// 当前点击节点如果是子节点或者是不可展开节点
					if (menu.exponded !== undefined) {
						// menu.active = false;
					}
				}
			} */


		});
	}



	switchTrigger() {
		this.isCollapsed = !this.isCollapsed;
		this._refreshMenuStatus();
	}

	// 同步菜单收缩恢复后的状态
	private _refreshMenuStatus() {
		if (this._currentId) {
			// 有currentId才做这个事情

			if (this._submenuRefMap.size > 0) {
				setTimeout(() => {
					for (const [key, submenu] of this._submenuRefMap) {
						const element = submenu['elementRef']['nativeElement'];
						if (this._currentId === element.id) {
							submenu.nzSubmenuService.setOpenState(true);
						}

						// 1. 点击子菜单就跳路由版本,手风琴模式
                        /* else {
                            submenu.nzSubmenuService.setOpenState(false);
                        } */
					}

					// 设置完成后, 需要重置这个id值,等待下次菜单收缩
					this._currentId = '';
				});
			}
		}
	}

	// 跳路由时设置菜单激活及展开状态
	private _setActiveRouter(url?: string) {
		for (const menu of this.menuList) {
			if (menu.exponded !== undefined && menu.children.length > 0) {
				// 先关闭所有激活状态,在随后的判断中选择性激活

				menu.active = false;
				for (const [k, item] of menu.children.entries()) {
					if (item.children) {
						item.active = false;
						for (const child of item.children) {
							if (child.route === (url || this.router.url)) {
								item.exponded = true;
								item.active = true;
								menu.exponded = true;
								menu.active = true;
								this.tabSvr.actionTab(child);
								return;
							}
						}
					} else {
						if (item.route === (url || this.router.url)) {
							menu.exponded = true;
							menu.active = true;
							this.tabSvr.actionTab(item);
							return;
						}
					}


				}
			}
		}
	}

	ngOnInit() {
		// console.log(this.router.routerState.snapshot.url);
	}

	ngAfterViewInit() {

		// 监听路由跳转,同步菜单状态
		this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
			// console.log(e);
			// console.log(e['urlAfterRedirects']);
			this.navigationEnd = e;
			// this._setActiveRouter(e['urlAfterRedirects']);
		});



		// 刷新后同步菜单状态
		// setTimeout(() => this._setActiveRouter(), 1000);
	}

}
