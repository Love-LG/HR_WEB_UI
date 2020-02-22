import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bully, BullySubjectService } from 'src/app/share/service/bully-subject.service';
import { wsSend } from 'src/app/public/utils/webservices';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { SYSTEM_EVENT, MESSAGE_CHANNEL } from 'app/app.constants';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private router: Router,
		private bully: BullySubjectService,
		private http: HttpClient
	) { }

    /**
     * check token
     */
	autoAccessToken() {
		// 还要判断这个token 过期没有
		if (!localStorage.getItem('access_token')) {
			this.logInCheck();
			return false;
		}
		return true;
	}

    /**
     * return access_token
     */
	getAccessToken() {
		this.autoAccessToken();
		return localStorage.getItem('access_token');
	}

    /**
     * login
     */
	logIn(username, password) {
		// 还有登录时间戳
		return wsSend('login', { 'arg0': username, 'arg1': password, 'arg2': true }, 'UserWebService');
	// return wsSend('login', { 'arg0': 'testuser9', 'arg1': 'Ttee7890*', 'arg2': true }, 'UserWebService');
	}
	logInCheck() {
		this.router.navigate(['/login']);
	}
    /**
     * 登出
     * userId
     */
	logOut(username) {
		return wsSend('logout', { 'arg0': username }, 'UserWebService');
	}
	login(param): Observable<any> {
        const url = `http://steecd.imwork.net:1016/login`;
        return this.http.post<any>(url, param);
    }

}
