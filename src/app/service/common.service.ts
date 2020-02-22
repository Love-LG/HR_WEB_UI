import { Injectable } from '@angular/core';
import { wsSend } from '../public/utils/webservices';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	equipConfig: EquipConfig[];
	commonTypeConfig: any = [];
	equipTypeObject: any = {
		ces: [],
		mes: [],
		isw: [],
		cds: [],
		dmc: [],
		dbs: [],
		tap: [],
		lus: [],
		dma: [],
		nms: [],
		ax: [],
		fir: [],
		it: [],
		eci: [],
		dci: [],
		sci: [],
		tci: [],
		wci: [],
		dca: [],
		css: [],
		hms: [],
		mea: [],
		ims: [],
		cfels: [],
		ticss: [],
		dcss: [],
		scss: [],
		wcss: [],
		group1: [],
		nfw: [],
		few: [],
		tcw: [],
		jfw: [],
		jeyes: [],
		bfw: [],
		bcw: [],
		esw: [],
		rcs: [],
		up2: [],
		nwt: [],
		awt: [],
		bks: [],
		fcw: [],
		bkw: [],
		rou: [],
		tas: [],
		ecs: [],
		vtl: [],
		asw: []
	};
	private communicationWithNetwork = new Subject<any>();
	constructor() {
		// this.GetAllCommonTypeConfig();
		// this.GetBackEndEquipment();
		// this.GetAllEquipConfig().subscribe((response: any) => {
		// 	this.equipConfig = response.Body.getAllEquipConfigResponse.equipConfigDtoList;
		// });
	}

	public allEquipConfig() {
		return this.equipConfig;
	}
	public VMS_EQUIP_TYPE() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'vms_equip_type') {
				array.push(item);
			}
		});
		return array;
	}
	// public GetAllEquipConfig() {
	// 	return wsSend('getAllEquipConfig', {}, 'CommonWebService')
	// }
	getEquipConfigById(id): EquipConfig {
		for (let item of this.equipConfig) {
			if (item['equipId'] === id)
				return item;
		}
	}
	public SendMessage(message: any) {
		this.communicationWithNetwork.next(message);
	}
	public GetMessage(): Observable<any> {
		return this.communicationWithNetwork.asObservable();
	}
	// GetAllCommonTypeConfig() {
	// 	wsSend('getAllCommonTypeConfig', {}, 'CommonWebService').subscribe((r) => {
	// 		const res: any = r;
	// 		this.commonTypeConfig = res.Body.getAllCommonTypeConfigResponse.commonTypeConfigList;
	// 	});
	// }

	// GetBackEndEquipment() {
	// 	wsSend('getBackEndEquipment', {}, 'AWWebService').subscribe((r) => {
	// 		const res: any = r;
	// 		const equipTypeList = res.Body.getBackEndEquipmentResponse.equipStatusList;
	// 		equipTypeList.forEach(item => {
	// 			let array = [];
	// 			if (this.equipTypeObject[item.equipType]) {
	// 				array = this.equipTypeObject[item.equipType];
	// 			}
	// 			this.equipTypeObject[item.equipType] = array;
	// 			array.push(item);
	// 		});
	// 		this.SendMessage({
	// 			type: 'eqtTypeChange',
	// 			data: this.equipTypeObject
	// 		});
	// 	});
	// }
	EXPWAY_CODE() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'expway_code') {
				array.push(item);
			}
		});
		array.sort(function(a, b) {

			return a.description.localeCompare(b.description);
	   });
		return array;
	}
	EXPWAY_DIRECTION() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'expway_direction') {
				array.push(item);
			}
		});
		return array;
	}
	ALERT_TYPE() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'traffic_alert') {
				array.push(item);
			}
		});
		return array;
	}
	EQUIP_TYPE() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'equip_type') {
				array.push(item);
			}
		});
		return array;
	}
	EMAS_SUBSYSTEM() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'emas_subsystem') {
				array.push(item);
			}
		});
		// console.log(array);
		return array;
	}

	VMS_FONTTYPE() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'vms_font_type') {
				array.push(item);
			}
		});
		return array;
	}

	VMS_PICGROUP() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'vms_pic_group') {
				array.push(item);
			}
		});
		return array;
	}

	TRAFFIC_MEASURE() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'lane_type') {
				array.push(item);
			}
		});
		return array;
	}

	VMS_MSG_CATEGORY() {
		const array: any = [];
		this.commonTypeConfig.forEach((item) => {
			if (item.name === 'vms_msg_category') {
				array.push(item);
			}
		});
		return array;
	}

}




interface EquipConfig {
	dir;
	enable;
	equipDesc;
	equipId;
	equipType;
	ipAddress;
	kmMarking;
	latitude;
	longitude;
	propertyCode;
	propertyDescription;
	subSystemId;
    systemId;
	trafficDataEnabled;
	expwayCode;
	phase;
}