import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/app.config';


@Injectable()
export class ConfigService {
  /**
   * 调试模式
   */
  public isDebug = !environment.production;

  // public sjHostName = ITMP_HOST_NAME;

  // private _API_GATEWAY = API_GATEWAY;

  apiIpPort = AppConfig.settings.apiIpPort;

  public apiUrl = {
    // incident: `${this._API_GATEWAY}/vnqnincidentmgt`, // incident_Mgt
    apiIpPort: `${this.apiIpPort}`,
  };
  constructor() {
   }

  /**
   * 对象格式化拼接
   * @param {any} data [对象 eg:{a:'a',b:'b',c:1}]
   * return a=a&b=b&c=1
   */
  public formatGetUrl(data: any) {
    // this.defaultPaging(data)
    let ret = '';
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        ret = ret.length > 0 ? ret + '&' : ret;
        ret = ret + i + '=' + data[i];
      }
    }
    return ret;
  }

  /* get xxxx(): string {
  return this._xxxx;
} */
}

/**
 * 页码
 */
/* export interface Page {
  // 条数
  size?: number;
  // 页码
  page?: number;
  // 排序字段
  sort?: string;
} */

/**
 * API
 */
/* export interface Result<T> {
  content?: T;
  errCode: number;
  msg?: string;
} */

/* export interface PageRes<T> {
  content: Array<T>;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}
 */
