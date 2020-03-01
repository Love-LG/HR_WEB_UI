import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emas-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // 年度统计
  optionAnnualStatistics = {
    legend: {
        data: ['去年', '今年'],
        y: 'top',
        icon: 'circle',
        itemGap: 40
    },
    color: ['#9C7AF7', '#0CD1CE'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name: '去年',
            type: 'bar',
            barWidth: 15,
            barGap: '0%',
            // barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390]
        },
        {
            name: '今年',
            type: 'bar',
            barWidth: 15,
            // barWidth: '60%',
            data: [20, 82, 300, 434, 590, 430, 320, 20, 82, 300, 434, 590]
        }
    ]
};

  constructor() { }

  ngOnInit() {
  }

}
