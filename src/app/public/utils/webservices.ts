import { Subject } from 'rxjs';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

const urlMap = {
	// AWWebService: { url: '/emas-AW_DB-0.0.1-SNAPSHOT/AWWebService', dataType: 0, tNameSpace: 'http://emasext.stee.com.sg/awvms' },
	CTETunDataService: { url: '/emas-AW_DB-0.0.1-SNAPSHOT/CTETunDataService', dataType: 0, tNameSpace: 'http://emasext.stee.com.sg/awvms' },
	CMHWebService: { url: '/emas-cmh-0.0.1-SNAPSHOT/CMHWebService', dataType: 0, tNameSpace: 'http://emasext.stee.com.sg/cmh' },
	OrganizationWebService: { url: '/msap-core/OrganizationWebService', dataType: 0 },
	PermissionWebService: { url: '/msap-core/PermissionWebService', dataType: 1 , tNameSpace: 'http://emasext.stee.com.sg/msap-core' },
	RoleWebService: { url: '/msap-core/RoleWebService', dataType: 0, tNameSpace: 'http://emasext.stee.com.sg/msap-core' },
	UserWebService: { url: '/msap-core/UserWebService', dataType: 1, tNameSpace: 'http://emasext.stee.com.sg/msap-core' },
	VMSWebService: { url: '/emas-AW_DB-0.0.1-SNAPSHOT/VMSWebService', dataType: 0, tNameSpace: 'http://emasext.stee.com.sg/awvms' },
	AuditLogWebService: { url: '/msap-core/AuditLogWebService', dataType: 1, tNameSpace: 'http://emasext.stee.com.sg/msap-core' },
	CMHTunWebService: { url: '/emas-cmh-0.0.1-SNAPSHOT/CMHTunWebService', dataType: 0 ,tNameSpace:'http://emasext.stee.com.sg/cmh'},
	// CommonWebService: { url: '/emas-AW_DB-0.0.1-SNAPSHOT/CommonWebService', dataType: 0, tNameSpace: 'http://emasext.stee.com.sg/awvms' }
};



export function wsSend(fnName: string, param, service: string) {
	const subject = new Subject();
	// const request = initData(fnName, param, service);
	// const client2 = new XMLHttpRequest();
	// client2.open('POST', '/webservice' + urlMap[service].url, true);
	// client2.setRequestHeader('Content-Type', 'text/xml');
	// client2.send(request);
	// client2.onreadystatechange = function () {
	// 	if (client2.readyState === 4) {
	// 		const json_obj = $['xml2json'](client2.responseText);
	// 		subject.next(json_obj);
			subject.unsubscribe();
	// 	}
	// };

	return subject;
}

function initData(fnName: string, param: Map<string, any>, service: string) {
	// let request =
	// 	`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
	// 	'<soap:Body>' +
	// 	`<ns1:${fnName} xmlns:ns1="${urlMap[service].tNameSpace}">`;

	// if (param) {
	//     switch (urlMap[service].dataType) {
	//         case 1:
	//             request += $['json2xml'](param, { ignoreRoot: true });
	//             break;
	//         case 0:
	//         default:
	//             for (const key in param) {
	//                 if (key) {
	//                     console.log(key);
	//                     request += `<ns1:${key}>${param[key]}</ns1:${key}>`;
	//                 }
	//             }
	//             // param.forEach((value, key) => {
	//             // 	request += `<ns1:${key}>${value}</ns1:${key}>`;
	//             // });
	//             break;
	//     }
	// }

	// if (param) {
	// 	switch (urlMap[service].dataType) {
	// 		case 1:
	// 			request += $['json2xml'](param, { ignoreRoot: true });
	// 			break;
	// 		case 0:
	// 		default:
	// 			const newParam = {}
	// 			for (const key in param) {
	// 				if (key) {
	// 					newParam[`ns1:${key}`] = param[key];
	// 				}
	// 			}
	// 			request += $['json2xml'](newParam, { ignoreRoot: true });
	// 			break;
	// 	}
	// }

	// request += `</ns1:${fnName}> </soap:Body></soap:Envelope>`;
	// return request;
}
