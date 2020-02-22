import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'emas-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  renderHeader = [];
  listOfData = [];
  isShowTracking = true;
  isShowRecord = false;
  isLocationRecord: boolean;
  searchText$ = new Subject<string>(); // 模糊搜索查询
  keyWords: string;
  macAddress: string;
  dataId: number;
  name: any;
  pageNation = {
    totalElements: 10,
    size: 10,
    curentPage: 1
  };

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.renderHeader = [
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
        value: 'email',
        isChecked: true
      },
      {
        name: 'Time Series Location Record',
        key: null,
        value: 'locationRecord',
        isChecked: true
      },
      {
        name: 'Mac Address Record',
        key: null,
        value: 'addressRecord',
        isChecked: true
      },
      {
        name: 'Status',
        key: null,
        value: 'status',
        isChecked: true
      }
    ];
    this.getData();
    this.searchPipeSet();
  }


  clickTr(i) {
    this.dataId = i;
  }

  showRecord(name, i, type: string) {
    this.macAddress = i;
    this.name = name;
    // this.getDate();
    this.isLocationRecord = type === 'location' ? true : false;
    this.isShowTracking = false;
    this.isShowRecord = true;
  }

  closeRecord() {
    this.isShowTracking = true;
    this.isShowRecord = false;
  }

  // 获取trackingList
  getData() {
    console.log(this.keyWords);
    const param = {
      keyWords: this.keyWords ? this.keyWords : '',
      pageNum: this.pageNation.curentPage,
      pageSize: 10
    };
    this.reportsService.getAppUserInfoList(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        const resData = r.data.content;
        this.pageNation.totalElements = r.data.totalElements;
        this.listOfData = resData;
        this.message.create('success', `${r.message}`);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }


   // 关键字搜索trackingList
   onSearch(e: string) {
    this.searchText$.next(e);
  }

  searchPipeSet() {
    this.searchText$.asObservable().pipe(
      debounceTime(1000)
      // distinctUntilChanged()
    ).subscribe(str => {
      // console.log(str);
      const param = {
        keyWords: str,
        pageNum: this.pageNation.curentPage,
        pageSize: 10
      };
      this.reportsService.getAppUserInfoList(param).subscribe(r => {
        console.log(r);
        if (r.msgCode === '200') {
          const resData = r.data.content;
          this.pageNation.totalElements = r.data.totalElements;
          this.listOfData = resData;
        } else {
          this.message.create('error', `${r.msg}`);
        }
      });
    });
  }

  // 分页查询
  pageIndexChange(e) {
    this.pageNation.curentPage = e;
    this.getData();
  }

}
