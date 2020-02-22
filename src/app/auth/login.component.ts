import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';
// import { MessagesService } from 'app/shared/service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
// import { sha256 } from 'js-sha256';
import * as $ from 'jquery';

@Component({
    selector: 'sj-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    clickLoding = false;
    username: '';
    password: '';
    constructor(
        public systemService: SystemService,
        private fb: FormBuilder,
        private authService: AuthService,
        // private msg: MessagesService,
        private router: Router,
        private loginService: LoginService,
        private message: NzMessageService,
    ) {
        // 语言服务
        this.systemService.langSet();
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    ngAfterViewInit(): void {
    }
    login() {
        this.router.navigate(['/emas/home']);

        // for (const i in this.loginForm.controls) {
        //     if (this.loginForm.controls.hasOwnProperty(i)) {
        //         this.loginForm.controls[i].markAsDirty();
        //         this.loginForm.controls[i].updateValueAndValidity();
        //     }
        // }
        // if (this.loginForm.invalid) {
        //     return;
        // }
        // this.clickLoding = true;
        // const value = this.loginForm.value;

        // const formData = new FormData();
        // formData.append('username', value.username);
        // formData.append('password', value.password);
        // this.authService.login(formData).subscribe((r) => {
        //     if (r.hasOwnProperty('back_user_id')) {
        //         const loginInfo = r;
        //         this._setUserInfo(loginInfo);
        //         this.router.navigate(['/emas/reports']);
        //     } else {
        //         this.message.create('error', 'username or password wrong!');
        //     }
        // });
    }
    logOut() {
        const xhr = new XMLHttpRequest();
        xhr.setRequestHeader('Authorization', this.loginService.getAccessToken() + '');
        this.authService.logout().subscribe((r) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('back_user_id');
            localStorage.removeItem('jsessionid');
        });
    }

    private _setStorage(key, value): void {
        localStorage.setItem(key, value);
    }

    private _setUserInfo(userInfo: any): void {
        this._setStorage('access_token', userInfo.token);
        this._setStorage('user_name', userInfo.back_user_name);
        this._setStorage('back_user_id', userInfo.back_user_id);
        this._setStorage('jsessionid', userInfo.jsessionid);
    }
}
