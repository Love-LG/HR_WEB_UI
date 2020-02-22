import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ConfigService } from 'app/config/config.service';
// import { USER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ConfigService } from '../config/config.service';

export const httpOptions: Object = {
    headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'No Auth'
    })
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private _login = 'http://steecd.imwork.net:1016';
    private _login = this.config.apiUrl.apiIpPort;

    constructor(private http: HttpClient,
        private loginService: LoginService,
         private config: ConfigService
    ) { }

    login(param): Observable<any> {
        const url = `${this._login}/login`;
        return this.http.post<any>(url, param);
    }
    logout(): Observable<any> {
        const url = `${this._login}/logout`;
        return this.http.post<any>(url, {}, this.getAccessToken());
    }
    getAccessToken() {
        // tslint:disable-next-line:no-shadowed-variable
        const httpOptions: Object = {
            headers: new HttpHeaders({
                token: this.loginService.getAccessToken() + ''
            })
        };
        return httpOptions;
    }
}
