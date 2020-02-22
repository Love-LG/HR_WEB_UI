import { Injectable } from '@angular/core';
import { Bully, BullySubjectService } from 'src/app/share/service/bully-subject.service';
import { wsSend } from 'src/app/public/utils/webservices';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
@Injectable({
    providedIn: 'root'
})
export class ReportsService {
   
    constructor(
        private http: HttpClient,
        private config: ConfigService
    ) { }
    
    public dev_api = this.config.apiUrl.apiIpPort;
    createAuthorizationHeader(headers: Headers) {
        headers.append('tenantId', '123');
    }



    getDailyRegisterNoStat(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/stat/dailyRegisterNoStat`;
        return this.http.get<any>(`${url}?startDate=${param.startDate}&endDate=${param.endDate}`);
    }

    getTotalRegistersNoStat(): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/stat/totalRegistersNoStat`;
        return this.http.get<any>(`${url}`);
    }

    getAppUserInfoList(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/trackinfo/getAppUserInfoList`;
        return this.http.get<any>(`${url}?keywords=${param.keyWords}&pageNum=${param.pageNum}&pageSize=${param.pageSize}`);
    }

    getTimeSeriesLocatonsByMacAddr(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/trackinfo/getTimeSeriesLocatonsByMacAddr`;
        return this.http.post<any>(`${url}`, param);
    }

    getScanBTMacAddrByDate(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/trackinfo/getScanBTMacAddrByDate`;
        return this.http.post<any>(`${url}`, param);
    }

    exportDailyRegisterNoStat(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/stat/exportDailyRegisterNoStat`;
        return this.http.get<any>(`${url}?startDate=${param.startDate}&endDate=${param.endDate}`);
    }

    exportTimeSeriesLocatonsByMacAddr(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/trackinfo/exportTimeSeriesLocatonsByMacAddr`;
        return this.http.post<any>(`${url}`, param);
    }

    exportScanMacAddressByDate(param): Observable<any> {
        const url = `${this.dev_api}/report-service/mttmgreport/trackinfo/exportScanMacAddressByDate`;
        return this.http.post<any>(`${url}`, param);
    }

    commonExport(param): Observable<Blob> {
        const url = `${this.dev_api}/report-service/mttmgreport/commonExport/csv`;
        return this.http.get(`${url}?csvFileName=${param.csvFileName}`, {
            responseType: 'blob'
        });
    }
    // exportExcel(param): Observable<Blob> {
    //     const url = `${this.apiUrl_custip_online}/ERP_MG_CustomerManagement/customerManagement/FileIO/exportExcel`;
    //     return this.http.get(`${url}?exportType=${param.exportType}&exportTable=${param.exportTable}&ids=${param.ids}`, {
    //         responseType: 'blob',
    //         headers: { 'roleId': this._roleId, 'userId': this._userId }
    //     });
    // }
    // getTotalRegistersNoStat

    getEquipTypeBySubSytem(data) {
        return wsSend('getEquipTypeBySubSytem', { 'subSystem': data }, 'CommonWebService');
    }

    getAllTechAlarmConfig() {
        return wsSend('getAllTechAlarmConfig', {}, 'CommonWebService');
    }

    getAllEquipConfig() {
        return wsSend('getAllEquipConfig', {}, 'CommonWebService');
    }
    getHistTrafficAlert(data) {
        // console.log(data)
        return wsSend('getHistTrafficAlert', data, 'AWWebService');
    }
    getCountOfHistTrafficMeasure(data) {
        return wsSend('getCountOfHistTrafficMeasure', data, 'AWWebService');
    }
    getHistTechAlarm(data) {
        return wsSend('getHistTechAlarm', data, 'AWWebService');
    }
    // equipStatus
    getCountOfHistEquipStatus(param) {
        return wsSend('getCountOfHistEquipStatus', param, 'AWWebService');
    }
    getHistEquipStatusByEquipIdAndDate(param) {
        return wsSend('getHistEquipStatusByEquipIdAndDate', param, 'AWWebService');
    }

    getHistTrafficMeasure(data) {
        return wsSend('getHistTrafficMeasure', data, 'AWWebService')
    }
    /*generate Report模块打印方法说明
     @method print
     @param{数组} eNum 表示要打印的echarts图数量
     @param{字符串} name 你要选区的dom节点id名称
     参考 traffic measure和technical alarm界面
 */
    print(eNum: number[], name: string) {
        const echartCanvas = document.getElementsByTagName('canvas');
        if (echartCanvas.length) {
            eNum.forEach(item => {
                document.getElementsByTagName('canvas')[item].setAttribute('id', 'echarts-canvas' + item);
                this['canvas' + item] = document.getElementById('echarts-canvas' + item);
                this['echartsImg' + item] = document.getElementById('echartsImg' + item);
                this['dataURL' + item] = this['canvas' + item].toDataURL();
                this['echartsImg' + item].src = this['dataURL' + item];
            });
        }
        const printelemnt: any = document.getElementById(name);
        const printHtml = printelemnt.innerHTML;
        window.document.body.innerHTML = printHtml;
        setTimeout(() => {
            window.print();
            window.location.reload();
        }, 500);
    }

}
