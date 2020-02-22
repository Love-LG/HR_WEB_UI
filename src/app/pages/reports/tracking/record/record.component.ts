import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment'


@Component({
  selector: 'emas-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() isLocationRecord: boolean;
  @Input() macAddress: string;
  @Input() name: any;
  @Output() closeRecord = new EventEmitter();
  renderHeader = [];
  listOfData = [];
  addressRenderHeader = [];
  addressListOfData = [];
  listOfChildrenData = [];
  listOfAddressChildrenData = [];

  dateCompare: string;
  visible: boolean;
  date: string;

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.isLocationRecord ? this.getData() : this.getAddressData();
    // this.listOfData = [{name: 'peter'}]
    console.log(this.macAddress);
    // this.getData();
    this.renderHeader = [
      {
        name: 'Time Series ',
        key: null,
        value: 'timeSeries',
        isChecked: true
      },
      {
        name: 'Coodinate',
        key: null,
        value: 'coodinate',
        isChecked: true
      }
    ];
    this.addressRenderHeader = [
      {
        name: 'Mac Address ',
        key: null,
        value: 'macAddress',
        isChecked: true
      },
      {
        name: 'Name',
        key: null,
        value: 'name',
        isChecked: true
      },
      {
        name: 'Phone No',
        key: null,
        value: 'phoneNo',
        isChecked: true
      },
      {
        name: 'Email',
        key: null,
        value: ' email ',
        isChecked: true
      },
      {
        name: 'Status',
        key: null,
        value: 'status ',
        isChecked: true
      }
    ];
  }

  backTracking() {
    this.closeRecord.emit();
  }

  // 根据MacAddress获取Time Series Location Record页面日期
  getData() {
    const param = {
      macAddress: this.macAddress,
      date: ''
    };
    this.reportsService.getTimeSeriesLocatonsByMacAddr(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        this.listOfData = [];
        r.data.forEach(item => {
          if (item) {
            this.listOfData.push({
              name: item,
              expand: false
            });
          }
        });
        this.message.create('success', `${r.message}`);
        console.log(this.listOfData);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }

  // 根据MacAddress和date获取当天的详细数据（Time Series Location Record）
  getDataByDate(date) {
    this.dateCompare = date;
    const param = {
      macAddress: this.macAddress,
      date
    };
    this.reportsService.getTimeSeriesLocatonsByMacAddr(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        this.listOfChildrenData = [];
        r.data.forEach(item => {
          if (item) {
            this.listOfChildrenData.push(item);
          }
        });
        this.message.create('success', `${r.message}`);
        console.log(this.listOfChildrenData);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }

  // 根据MacAddress获取Mac Address Record页面日期
  getAddressData() {
    const param = {
      macAddress: this.macAddress,
      date: ''
    };
    this.reportsService.getScanBTMacAddrByDate(param).subscribe(r => {
      console.log(r);
      console.log(999);
      if (r.msgCode === '200') {
        this.addressListOfData = [];
        r.data.forEach(item => {
          if (item) {
            this.addressListOfData.push({
              name: item,
              expand: false
            });
          }
        });
        this.message.create('success', `${r.message}`);
        console.log(this.addressListOfData);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }

  // 根据MacAddress和date获取当天的详细数据（Mac Address Record）
  getAddressDataByDate(date) {
    this.dateCompare = date;
    const param = {
      macAddress: this.macAddress,
      date
    };
    this.reportsService.getScanBTMacAddrByDate(param).subscribe(r => {
      console.log(r);
      console.log(888);
      if (r.msgCode === '200') {
        this.listOfAddressChildrenData = [];
        r.data.forEach(item => {
          if (item) {
            this.listOfAddressChildrenData.push(item);
          }
        });
        this.message.create('success', `${r.message}`);
        console.log(this.listOfAddressChildrenData);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }

  // 根据MacAddress获取Time Series Location Record页面导出
  exportTimeSeriesLocatonsByMacAddr() {
    const param = {
      macAddress: this.macAddress
    };
    this.reportsService.exportTimeSeriesLocatonsByMacAddr(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        const param1 = {
          csvFileName: r.data
        };
        this.reportsService.commonExport(param1).subscribe(res => {
          console.log(res);
          const blob = new Blob([res], { type: 'application/csv' });
          const fileName = `${new Date().valueOf()}.xls`;
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href);
        });
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }

  // 根据MacAddress获取Mac Address Record页面导出
  exportScanMacAddressByDate() {
    const param = {
      macAddress: this.macAddress,
      date: ''
    };
    this.reportsService.exportScanMacAddressByDate(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        const param1 = {
          csvFileName: r.data
        };
        this.reportsService.commonExport(param1).subscribe(res => {
          console.log(res);
          const blob = new Blob([res], { type: 'application/csv' });
          const fileName = `${new Date().valueOf()}.xls`;
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href);
        });
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }

  // 导出
  export() {
    this.isLocationRecord ? this.exportTimeSeriesLocatonsByMacAddr() : this.exportScanMacAddressByDate();
  }

   // 获取起始时间
   onChange(result: Date): void {
    console.log('date: ', result);
    if (!result && this.isLocationRecord) {
      this.getData();
      this.dateCompare = null;
      return;
    }
    if (!result && !this.isLocationRecord) {
      this.getAddressData();
      this.dateCompare = null;
      return;
    }
    this.date = moment(result).format('YYYY-MM-DD');
    const param = {
      macAddress: this.macAddress,
      date: this.date
    };
    this.isLocationRecord && this.date ?  this.reportsService.getTimeSeriesLocatonsByMacAddr(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        this.listOfData = [{name: this.date,  expand: false}];
        this.dateCompare = this.date;
        console.log(this.listOfData);
        this.listOfChildrenData = r.data;
        this.message.create('success', `${r.message}`);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    }) : this.reportsService.getScanBTMacAddrByDate(param).subscribe(r => {
      console.log(r);
      console.log(999);
      if (r.msgCode === '200') {
        this.addressListOfData = [{name: this.date,  expand: false}];
        this.dateCompare = this.date;
        this.listOfAddressChildrenData = r.data;
        this.message.create('success', `${r.message}`);
        console.log(this.addressListOfData);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
    // this.getDataByStartTimeAdnEndTime(param);
  }

}
