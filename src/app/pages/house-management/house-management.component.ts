import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emas-house-management',
  templateUrl: './house-management.component.html',
  styleUrls: ['./house-management.component.css']
})
export class HouseManagementComponent implements OnInit {
  renderHeader = [
		{
			name: '名称',
			key: null,
			value: 'name',
			isChecked: true
    },
    {
			name: '地址',
			key: null,
			value: 'location',
			isChecked: true
    },
		{
			name: '房屋类型',
			key: null,
			value: 'roomtype',
			isChecked: true
		},
		{
			name: '租金',
			key: null,
			value: 'rent',
			isChecked: true
    },
    {
			name: '交租方式',
			key: null,
			value: 'paymentMethod',
			isChecked: true
    },
    {
			name: '面积',
			key: null,
			value: 'area',
			isChecked: true
    },
    {
			name: '楼层',
			key: null,
			value: 'floor',
			isChecked: true
    },
    {
			name: '朝向',
			key: null,
			value: 'Towards',
			isChecked: true
    },
    {
			name: '简介',
			key: null,
			value: 'remark',
			isChecked: true
    },
    {
			name: '详情',
			key: null,
			value: 'detail',
			isChecked: true
    },
  ];
  listOfData = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.listOfData.push({
        name: '爱情公寓',
        location: '北京朝阳区',
        roomtype: '套二',
        rent: '3500/月',
        paymentMethod: '押一付三',
        area: '120',
        floor: '25楼',
        Towards: '朝南',
        remark: '房源简介'
      });
    }
  }

}
