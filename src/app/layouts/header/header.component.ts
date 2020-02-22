import { PublicComModule } from './../../public/public-com.module';
import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { SystemService } from 'src/app/service/system.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from '../../auth/login.service';
import { DialogService } from 'src/app/share/dialog';
import { TabRouterService } from '../tab-router/tab-router.service';
import { windowWhen } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sj-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    // animations: [fadeIn, fadeOut]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    get newMsg(): any[] {
        return this.systemMessage.filter(item => item.isNew);
    }
    isVisible = false;
    username: any = '';
    showSider = true;
    gisAccess = false;
    openGisLoading = false;
    showMsgBox = false;
    systemMessage = [];
    subscription: Subscription = null;
    // userName = localStorage.getItem('user_name');
    // roleName = localStorage.getItem('roleName');
    userName = '';
    roleName = '';
    flag = true;
    constructor(
        private translate: TranslateService,
        private router: Router,
        public systemService: SystemService,
        private nzMessageService: NzMessageService,
        private loginService: LoginService,
        private dialog: DialogService,
        private tabRouter: TabRouterService,
        private authService: AuthService,
    ) {
        // 语言服务
        // this.systemService.langSet();

        // 查看gis权限
        // this.checkGisAccess();
    }

    // checkGisAccess() {
    //     const roleId = localStorage.getItem('role_id');
    //     this.auth.getAccessRightByRoleId(roleId).subscribe(res => {
    //         if (res['code'] === '000000') {
    //             this.gisAccess = res['data'].some(role => role.rightName === 'GIS');
    //             if (this.gisAccess) {
    //                 this.openGIS();
    //             }
    //         }
    //     });
    // }

    openGIS() {
        this.openGisLoading = true;
        const url = `${location.origin}/#/gis`;
        window.open(url);

        setTimeout(() => (this.openGisLoading = false), 5000);
    }

    login() {
        this.router.navigate(['/login']);
    }
    // sider的显示与隐藏
    onShowSider() {
        this.showSider = !this.showSider;
    }
    // 发送CCM登出状态的消息
    ccmlogOut() {
        // this.ls.logOut();
    }
    cancel(): void {
        this.nzMessageService.info('cancel');
    }
    // 打印
    print() {
        // const printhtml = bodyhtml.substring(bodyhtml.indexOf(startFlag),
        //     bodyhtml.indexOf(endFlag));
        // 生成并打印ifrme
        // const printHtml = document.getElementById('tableContent').innerHTML;
        // const f = document.getElementById('printf');
        // f.contentDocument.write(printHtml);
        // f.contentDocument.close();
        // f.contentWindow.print();

        // 有打印样式，但取消页面不重载，使用reload重载
        const printHtml = document.getElementById('tableContent').innerHTML;
        //  const preHtml = window.document.body.innerHTML;
        window.document.body.innerHTML = printHtml;
        window.print();
        //  window.document.body.innerHTML = preHtml;
        window.location.reload();

        // 无打印样式
        // const printHtml = document.getElementById('tableContent').innerHTML;
        // const newWindow = window.open('page.html');
        // newWindow.document.body.innerHTML = printHtml;
        // newWindow.print();
        // newWindow.close();
    }
    // 帮助
    help() {
        this.flag = true;
        this.isVisible = true;
    }

    // 关于
    about() {
        this.flag = false;
        this.isVisible = true;
    }
    logout() {
        this.authService.logout().subscribe((res) => {
            if (res.msg === '退出登录成功') {
                this.router.navigate(['/login']);
                localStorage.removeItem('access_token');
                localStorage.removeItem('back_user_id');
                localStorage.removeItem('jsessionid');
            } else {
                this.nzMessageService.create('error', 'Logout failed!');
            }
        });
    }

    // logout
    confirm(): void {
        this.nzMessageService.info('loginout success!');
        this.username = localStorage.getItem('user_name');
        this.loginService.logOut(this.username).subscribe((r) => {

            localStorage.removeItem('access_token');
        });
        localStorage.clear();
        this.tabRouter.closeAll();
        this.router.navigate(['/login']);
    }
    private _clearMsg() {
        if (this.systemMessage.length > 50) {
            this.systemMessage.length = 50;
        }
    }
    ngOnInit() {
        // const tempRole = localStorage.getItem('role_id').slice(5).toLowerCase();
        this.userName = localStorage.getItem('user_name');
        // this.roleName = tempRole.substring(0, 1).toUpperCase() + tempRole.substring(1);
        // this.subscription = this.bully.getSubject().subscribe(res => {
        //     if (res['type'] === SYSTEM_EVENT.ALERT_EVENT || res['type'] === SYSTEM_EVENT.ALARM_EVENT) {
        //         if (res['data']) {
        //             const data = res['data'];
        //             data.time = Date.now();
        //             data.isNew = true;
        //             // 当长度大于50条时随机删除一个消息
        //             this._clearMsg();

        //             this.systemMessage = [res['data'], ...this.systemMessage];
        //         }
        //     }
        // });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => this.systemService.timeSet());
    }
}
