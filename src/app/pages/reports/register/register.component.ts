import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'emas-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  chartOption: any;
  visible: boolean;
  totalRegister: number;
  xData = [];
  yData = [];
  dateFormat = 'yyyy/MM/dd';
  startDate: string;
  endDate: string;

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.chartOption = {
      title: {
        // text: 'Accumulative Tatal'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        name: 'Date',
        splitLine: { show: false },
        data: this.xData,
        nameTextStyle: {
          color: '#333333',
          fontSize: 16,
        },
      },
      yAxis: {
        name: 'No.of Registers',
        nameTextStyle: {
          color: '#333333',
          fontSize: 16,
        },
        type: 'value'
      },
      series: [{
        // itemStyle: {
        //   normal: {
        //     color: 'lightgreen', // 改变折线点的颜色
        //     lineStyle: {
        //       color: 'green' // 改变折线颜色
        //     }
        //   }
        // },
        itemStyle: {
          normal: {
              label: {
                  show: true,		//开启显示
                  position: 'top',	//在上方显示
                  textStyle: {	    //数值样式
                      color: 'black',
                      fontSize: 16
                  }
              }
          }
      },
        name: 'No.of Registers',
        data: this.yData,
        type: 'bar',
        smooth: true
      }]
    };
  //   this.chartOption = {
  //     xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [{
  //         data: [120, 200, 150, 80, 70, 110, 130],
  //         type: 'bar'
  //     }]
  // };
    this.getTotal();
  }

  // 获取起始时间
  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
    this.startDate = moment(result[0]).format('YYYY-MM-DD');
    this.endDate = moment(result[1]).format('YYYY-MM-DD');
    const param = {
      startDate: `${this.startDate} 00:00:00`,
      endDate: `${this.endDate} 23:59:59`
    };
    this.getDataByStartTimeAdnEndTime(param);
  }

  // 根据起始时间获取register人数
  getDataByStartTimeAdnEndTime(param) {
    console.log(param);
    this.reportsService.getDailyRegisterNoStat(param).subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        const resData = r.data;
        this.xData = [];
        this.yData = [];
        resData.forEach(item => {
          this.xData.push(item.date);
          this.yData.push(item.registerNo);
        });
        console.log(this.chartOption);
      } else {
        this.message.create('error', `${r.msg}`);
      }
      this.chartOption = {
        title: {
          // text: 'Accumulative Tatal'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: 'Date',
          splitLine: { show: false },
          data: this.xData,
          nameTextStyle: {
            color: '#333333',
            fontSize: 16,
          },
        },
        yAxis: {
          name: 'No.of Registers',
          type: 'value',
          nameTextStyle: {
            color: '#333333',
            fontSize: 16,
          },
        },
        series: [{
          // itemStyle: {
          //   normal: {
          //     color: 'lightgreen', // 改变折线点的颜色
          //     lineStyle: {
          //       color: 'green' // 改变折线颜色
          //     }
          //   }
          // },
          itemStyle: {
            normal: {
                label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                        color: 'black',
                        fontSize: 16
                    }
                }
            }
        },
          name: 'No.of Registers',
          data: this.yData,
          type: 'bar',
          smooth: true
        }]
      };
    });
  }

  // 获取总的注册人数
  getTotal() {
    this.reportsService.getTotalRegistersNoStat().subscribe(r => {
      console.log(r);
      if (r.msgCode === '200') {
        this.totalRegister = r.data;
        console.log(this.totalRegister);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }


  // 导出
  exportDailyRegisterNoStat() {
    const param = {
      startDate: this.startDate,
      endDate: this.endDate
    };
    param.startDate && param.endDate ?
      this.reportsService.exportDailyRegisterNoStat(param).subscribe(r => { // 根据起始时间获取到处文件名
        console.log(r);
        if (r.msgCode === '200') {
          const param1 = {
            csvFileName: r.data
          };
          this.reportsService.commonExport(param1).subscribe(res => { // 根据导出文件名导出excel
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
      }) : this.message.create('warning', `Please choose start and end date`);
  }

}
