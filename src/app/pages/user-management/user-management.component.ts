import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emas-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  renderHeader = [
		{
			name: '用户名',
			key: null,
			value: 'userName',
			isChecked: true
    },
    {
			name: '性别',
			key: null,
			value: 'sex',
			isChecked: true
    },
		{
			name: '手机号',
			key: null,
			value: 'phoneNumber',
			isChecked: true
		},
		{
			name: '密码',
			key: null,
			value: 'Password',
			isChecked: true
		}
  ];
  listOfData = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.listOfData.push({
        name: '曾某某',
        sex: '男',
        phoneNum: '13981868694',
        passWorld: '123456'
      });
    }
  }

}
