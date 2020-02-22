import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './app-config.model';
import { Injectable } from '@angular/core';

// Code taken from https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/

@Injectable()
export class AppConfig {
    static settings: IAppConfig;

    constructor(private http: HttpClient) {

    }

    load() {
        const configFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(configFile).toPromise().then((response: IAppConfig) => {
               AppConfig.settings = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${configFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
