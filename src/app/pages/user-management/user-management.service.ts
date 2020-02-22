import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Bully, BullySubjectService} from 'src/app/share/service/bully-subject.service';
import {wsSend} from 'src/app/public/utils/webservices';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { ConfigService } from 'src/app/config/config.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	 
	constructor(
		private router: Router,
		private bully: BullySubjectService,
		private http:HttpClient,
		private config: ConfigService

	) {
	}
	public dev_api = this.config.apiUrl.apiIpPort;
	$addData: Subject<any> = new Subject();
	$totalPage: Subject<any> = new Subject();
	registUser(param): Observable<any> {
		const token = localStorage.getItem('access_token')
        const url = `${this.dev_api}/mttmguser/bkuser/registerBkUser`;
		// const url = 'http://steecd.imwork.net:1016/mttmguser/bkuser/registerBkUser';
		let headers = new HttpHeaders();
		headers= headers.set('token',token)
		// headers= headers.set('content-type', 'application/json');
		return this.http.post(url , param, {headers}); 
        // return this.http.post<any>(url, param);
	}
	getAllUser():Observable<any> {
		const token = localStorage.getItem('access_token')
        const url = `${this.dev_api}/mttmguser/bkuser/getBkUserInfoList?pageNum=1&pageSize=10&keywords`;

		// const url = 'http://steecd.imwork.net:1016/mttmguser/bkuser/getBkUser/2';
		// const url ='http://steecd.imwork.net:1016/mttmguser/bkuser/getBkUserInfoList?pageNum=1&pageSize=10&keywords'
		let headers = new HttpHeaders();
		headers= headers.set('token',token)
		return this.http.get(url , {headers}); 
	}
	editUser(param):Observable<any> {
		const token = localStorage.getItem('access_token')
        const url = `${this.dev_api}/mttmguser/bkuser/updateBkUser`;

		// const url = 'http://steecd.imwork.net:1016/mttmguser/bkuser/updateBkUser';
		let headers = new HttpHeaders();
		headers= headers.set('token',token)
		// headers= headers.set('content-type', 'application/json');
		return this.http.post(url , param,{headers}); 
        // return this.http.post<any>(url, param);
	}
	deleteUser(id):Observable<any>{
		const token = localStorage.getItem('access_token')
		const url = `${this.dev_api}/mttmguser/bkuser/deleteBkUser/`+id;

		// const url = 'http://steecd.imwork.net:1016/mttmguser/bkuser/deleteBkUser/'+id;
		let headers = new HttpHeaders();
		headers= headers.set('token',token)
		return this.http.delete(url ,{headers}); 	
	}
	// test():Observable<any>{
	// 	const url ='http://steecd.imwork.net:1016/mttmgreport/stat/ exportDailyRegisterNoStat?startDate=2020-02-16&endDate=2020-02-17'
	// 	return this.http.get<any>(url);
	// }
	/**
	 * User Role
	 */
	FindAllRoles() {
		return wsSend('findAllRoles', {}, 'RoleWebService');
	}
	findAllPermissions() {
		return wsSend('findAllPermissions', {}, 'PermissionWebService');
	}
	addPermissionsToRole(data) {
		// console.log(data);
		return wsSend('addPermissionsToRole', data, 'PermissionWebService');
	}
	/**
	 * User
	 */
	findAllUsers() {
		return wsSend('findAllUsers', {}, 'UserWebService');
	}
	/**
	 * addUser
	 */
	addUser(data) {
		return wsSend('addUser', {'arg0': data}, 'UserWebService');
	}
	updateUser(data) {
		return wsSend('updateUser', {'arg0': data}, 'UserWebService');
	}
	/**
	 * deleteUser
	 */
	removeUser(data) {
		// console.log(data)
		 return wsSend('removeUser', {'arg0': data}, 'UserWebService');
	}
	// getSelectList(arr,key,listName) {
	// 	let map = new Map();
	// 	arr.forEach((item)=>{
	// 	  if (!map.has(item[key])&&item[key]){
	// 	  map.set(item[key],item);
	// 	  }
	// 	});
	// 	let uniqueList = [...map.values()];
	// 	console.log(uniqueList);
	// 	uniqueList.forEach((data) => {
	// 		listName.push({label: data[key],value: data[key]});
	// 	  });
	// 	}

}
