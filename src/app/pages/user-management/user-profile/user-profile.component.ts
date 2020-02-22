import { Component, OnInit, ɵConsole, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-management.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'sj-emas-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	@Output() PageChanged = new EventEmitter();
	deleteSelect = true;
	removeUserTest: any = [];
	deleteStatus: false;
	displayTotalPage: '';
	pageChange: '';
	sortName: string | null = null;
	sortValue: string | null = null;
	displayListOne = [];
	removeUser: any = [];
	createdDate: any = '';
	lastLoginDate = '';
	passwordLastModDate = '';
	updateId: '';
	updateName: '';
  renderHeader = [
		{
			name: 'User ID',
			key: null,
			value: 'userID',
			isChecked: true
		},
		{
			name: 'User Name',
			key: null,
			value: 'userName',
			isChecked: true
		},
		{
			name: 'Division',
			key: null,
			value: 'division',
			isChecked: true
		},
		{
			name: 'Role',
			key: null,
			value: 'role',
			isChecked: true
		},
		{
			name: 'Status',
			key: null,
			value: 'status',
			isChecked: true
    }
	];
	validateForm: FormGroup;
	addUserForm: FormGroup;
	updateUserForm: FormGroup;
	controlArray: any[] = [];
	isCollapse = true;
	listOfData = [
    {
      id: 0,
			userId: '1231231231'
		},
		{
      id: 1,
			userId: '1231231231'
		},
		{
      id: 2,
			userId: '1231231231'
		},
		{
      id: 3,
			userId: '1231231231'
		}
  ];
	//   获取所有用户
	allUserList: any = [];
	displayOfDateList: any = [];
	adduser = true;
	userIdAdd = false;
	roleAdd = false;
	userNameAdd = false;
	divisionAdd = false;
	passwordAdd = false;
	rePasswordAdd = false;
	// 获取所有角色
	AllRoleList = [{
		description: 'All',
		value: 'All'
	}];
	updateRoleList = [];
	addRoleList = [];
	addDivisionList = [];
	DivisionList = [{
		companyName: 'All',
		value: 'All'
	}];
	updateDivisionList = [];
	Profiledata = 1;
  	listOfData2 = [];
	listRole: Array<{ label: string; value: number }> = [
		{ label: 'All', value: 1},
		{ label: 'Role', value: 2},
		{ label: 'Role', value: 3},
		{ label: 'Role', value: 4},
	  ];
	listDvision: Array<{ label: string; value: number }> = [
		{ label: 'All', value: 1},
		{ label: 'Dvision', value: 2},
		{ label: 'Dvision', value: 3}
  ];
  // 选择器
  listOfSelection = [
    {
      text: 'Select All',
      onSelect: () => {
        this.checkAll(true);
      }
    }
  ];
  password = '';
  roleId = '';
  flesSelect = '';
  roleSelect = '';
  divisionSelect = '';
  roleSelectB = '';
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
	constructor(
		private fb: FormBuilder,
		private UserService: UserService,
		private message: NzMessageService,
		private modalService: NzModalService
		) {
		}
		sort(sort: { key: string; value: string }): void {
			this.sortName = sort.key;
			this.sortValue = sort.value;
			this.search();
		}
		search(): void {
			const data = this.allUserList;
			// console.log(this.displayListOne);
			// console.log(this.sortValue);
			// this.displayListOne = [];
			this.displayOfDateList = [];

			/** sort data **/
			if (this.sortName && this.sortValue) {
				const arr  = data.sort((a, b) =>
				  this.sortValue === 'ascend'
					? a[this.sortName!] > b[this.sortName!]
					  ? 1
					  : -1
					: b[this.sortName!] > a[this.sortName!]
					? 1
					: -1
				);
				this.displayOfDateList = [...arr];
				// this.displayListOne = [...arr];
				// console.log(this.displayListOne);
			} else {
				this.displayOfDateList = [ ...data];
				// this.displayListOne = [ ...data];
				// console.log(this.displayListOne);
			}
		}
	ngOnInit() {
		this.UserService.$addData.next(this.pageChange)
		// console.log(this.allUserList)
		this.initForm();
		// console.log(this.validateForm);
		this.GetAllUsers();
		this.getAllRoll();
		// console.log(this.DivisionList);
		this.divisionSelect = this.DivisionList[0].companyName;
	}

	initForm() {
		this.validateForm = this.fb.group({
			userId: [{ value: null, disabled: false }],
			username: [{ value: null, disabled: false }],
			roleId: [{ value: null, disabled: false }],
			companyName: [{ value: null, disabled: false }],
		});
		this.addUserForm = this.fb.group({
			adduserID: [{ value: null, disabled: false }],
			addRole: [{ value: null, disabled: false }],
			addUserName: [{ value: null, disabled: false }],
			AddDvision: [{ value: null, disabled: false }],
			Password: [{ value: null, disabled: false }],
			RePassword: [{ value: null, disabled: false }],
		});
		this.updateUserForm = this.fb.group({
			userId: [{ value: null, disabled: false }],
			username: [{ value: null, disabled: false }],
			enabled: [{ value: null, disabled: false }],
			createdDate: [{ value: null, disabled: false }],
			role: [{ value: null, disabled: false }],
			companyName: [{ value: null, disabled: false }],
			lastLoginDate: [{ value: null, disabled: false }],
			passwordLastModDate: [{ value: null, disabled: false }],
			password: [{ value: null, disabled: false }],
		});
		this.addUserForm.get('adduserID').valueChanges.subscribe(value => {
			if (value) {
				// console.log('adduserID存在');
				this.userIdAdd = true;
			} else {
				// console.log('adduserID no');
				// this.adduser = true
			}
		});
		this.addUserForm.get('addRole').valueChanges.subscribe(value => {
			if (value !== 'null') {
				// console.log('addRole存在');
				this.roleAdd = true;
			} else {
				// console.log('addRole no');
				this.adduser = true;
			}
		});
		this.addUserForm.get('addUserName').valueChanges.subscribe(value => {
			if (value) {
				// console.log('addUserName存在');
				this.userNameAdd = true;
			} else {
				// console.log('addUserName no');
				this.adduser = true;
			}
		});
		this.addUserForm.get('AddDvision').valueChanges.subscribe(value => {
			if (value !== 'null') {
				// console.log('AddDvision存在');
				this.divisionAdd = true;
			} else {
				// console.log('AddDvision no');
				this.adduser = true;
			}
		});
		this.addUserForm.get('Password').valueChanges.subscribe(value => {
			if (value) {
				// console.log('Password存在');
				this.passwordAdd = true;
				this.password = value;
				// console.log(this.password);
			} else {
				// console.log('Password no');
				this.adduser = true;
			}
		});
		this.addUserForm.get('RePassword').valueChanges.subscribe(value => {
			if (value === this.password && this.userIdAdd && this.roleAdd && this.userNameAdd && this.divisionAdd && this.passwordAdd ) {
				// console.log('存在');
				this.adduser = false;
			} else {
				// console.log('RePassword no');
				this.adduser = true;
			}
		});
	}
	formPatchValue(): void {
		// console.log(this.flesSelect.value);
		// console.log(this.tempA);
		// console.log(this.listOpeStatus[0].value);
		// console.log(this.listOpeStatus[0].value === this.flesSelect.value);
		 this.validateForm.patchValue({
			roleId: this.AllRoleList[0].value,
			companyName: this.DivisionList[0].value
		 });
		}
	compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

	log(value: {value: string}): void {
	  // console.log(value);
	}
	// 前台筛选
	searchFrontEnd(item): void {
		 // console.log(item)
		const filterFieldArr = Object.keys(item);
		this.displayOfDateList = this.allUserList;
		const newArr = filterFieldArr.reduce((pre, cur, index) => {
			// console.log(pre)
			// console.log(item[cur])
			if (item[cur] === 'All') {
				return pre;
			} else {
				return pre.filter(data =>
					item[cur] ? item[cur] === data[cur] : true
				);
			}
		}, this.displayOfDateList);
		// console.log(newArr);
		// console.log(filterFieldArr)
		this.displayOfDateList = newArr;
	}
	submitForm(): void {
		this.Profiledata = 1;
		 // console.log(this.validateForm);
		 if (this.validateForm.value.userId === null
			&& this.validateForm.value.username === null
			&& this.validateForm.value.companyName === this.DivisionList[0].value
			&& this.validateForm.value.roleId === this.AllRoleList[0].description) {
			this.displayOfDateList = this.allUserList;
			// console.log(this.displayListOfData)
		} else {
			this.searchFrontEnd(this.validateForm.value);
			// console.log(this.validateForm.value)
		}
		const ttt: number = this.displayOfDateList.length / 10;
		const yu = this.displayOfDateList.length % 10;
		 if (yu < 5) {
			// localStorage.setItem('totalPage', (ttt + 0.5).toFixed(0));
			this.UserService.$totalPage.next((ttt + 0.5).toFixed(0));
		 } else {
			 // localStorage.setItem('totalPage', ttt.toFixed(0));
			 this.UserService.$totalPage.next(ttt.toFixed(0));
		 }
  }
  addShow() {
	this.addUserForm.patchValue({
		addRole: this.addRoleList[0] ? this.addRoleList[0].value : ''
	});
  }
  submitAddForm(): void {
	// console.log(this.addUserForm);
	const data: any = this.addUserForm.value;
	const addData = {
		'companyName': data.AddDvision,
		'password': data.Password,
		'roleId': data.addRole,
		'userId': data.adduserID,
		'username': data.addUserName
	};
	this.UserService.addUser(addData).subscribe((r) => {
		 // console.log(r);
		 const temp: any = r;
		 if (temp.Body.Fault) {
			this.message.create('error', temp.Body.Fault.faultstring);
		 } else {
			this.message.create('success', `Successful addition of users`);
			this.Profiledata = 1;
		this.GetAllUsers();
		 }
	});
	// alert('success!');
}

  refreshStatus(): void {
	this.removeUser = [];
	this.removeUserTest = [];
	let data: any = '';
	// console.log(this.mapOfCheckedId);
	 data = this.mapOfCheckedId;
	 for (const key in this.mapOfCheckedId) {
		 if (key) {
			 this.deleteSelect = false;
			 if (this.mapOfCheckedId[key] === true) {
				 // console.log(key);
				 this.removeUser.push({key: key});
				 this.removeUserTest.push({key: key});
			 }
		 }
	 }
	 if (this.removeUser.length) {
		this.deleteSelect = false;
	 } else {
		this.deleteSelect = true;
	 }
	 // console.log(this.removeUser);
		this.isAllDisplayDataChecked = this.allUserList.every(item => this.mapOfCheckedId[item.userId]);    this.isIndeterminate =
      this.allUserList.some(item => this.mapOfCheckedId[item.userId]) && !this.isAllDisplayDataChecked;
	// console.log(this.allUserList);
	}
	showModal(e) {
		 // console.log(this.displayOfDateList);
		//  console.log(e)
		this.Profiledata = 3;
		this.updateId = e.userId;
		this.updateName = e.username;
		this.createdDate = e.createdDate;
		this.updateUserForm.patchValue({
			userId: e.userId,
			password: e.password,
			role: e.roleId,
			companyName: e.companyName,
			enabled: e.enabled,
			createdDate: e.createdDate,
			passwordLastModDate: e.passwordLastModDate,
			lastLoginDate: e.lastLoginDate,
			username: e.username
		});
		this.lastLoginDate = e.lastLoginDate ? e.lastLoginDate : '01/01/0001/12:00:00';
		// console.log(this.lastLoginDate);
		this.passwordLastModDate =  e.passwordLastModDate ? e.passwordLastModDate : '01/01/0001/12:00:00';
	}
	changePage(e) {
		// console.log(e);
		this.pageChange = e;
		this.UserService.$addData.next(this.pageChange);
		this.PageChanged.emit(e);
	}
	deleteUser() {
		if (this.removeUser.length) {
			let includeUserName = false;
			this.removeUser.forEach((item) => {
					const username = localStorage.getItem('user_name');
					if (username === item.key) {
						this.message.create('error', `Sorry,you cannot delete your own account`)
						includeUserName = true;
						this.mapOfCheckedId = {};
						return;
					}
				});
				if (includeUserName) {
					// console.log('包含')
				} else {
					// console.log('不包含')
					this.removeUser.forEach((item) => {
						this.UserService.removeUser(item.key).subscribe((r) => {
							this.GetAllUsers();
						});
					});
				}
		} else {
			// console.log('未选中');
		}
	}
	showDeleteConfirm(): void {
		this.modalService.warning({
		  nzTitle: 'Do you really wish to delete the selected User(s)?',
		//   nzContent: '<b style="color: red;">Some descriptions</b>',
		  nzOkText: 'Yes',
		  nzOkType: 'danger',
		  nzOnOk: () => this.deleteUser(),
		  nzCancelText: 'No',
		  nzOnCancel: () => console.log('Cancel')
		});
	  }
  checkAll(value: boolean): void {
    this.allUserList.forEach(item => (this.mapOfCheckedId[item.userId] = value));
    this.refreshStatus();
  }
//   获取所有用户
  GetAllUsers(): void {
	this.UserService.findAllUsers().subscribe((r: any) => {
		const tempData: any = r;
		// console.log(tempData.Body.findAllUsersResponse.userList)
		this.allUserList = tempData.Body.findAllUsersResponse.userList;
		this.displayListOne = this.allUserList;
		this.displayOfDateList = this.allUserList;
		const ttt: number = this.displayOfDateList.length / 10;
		const yu = this.displayOfDateList.length % 10;
		 if (yu < 5) {
			// localStorage.setItem('totalPage', (ttt + 0.5).toFixed(0));
			this.UserService.$totalPage.next((ttt + 0.5).toFixed(0));
		 } else {
			 // localStorage.setItem('totalPage', ttt.toFixed(0));
			 this.UserService.$totalPage.next(ttt.toFixed(0));
		 }
		// console.log(this.allUserList);
		this.allUserList.forEach((item) => {
			// item.description = item.roleList.description;
			// 去重
			let unique = true;
			this.DivisionList.forEach((j) => {
				if (item.companyName === j.companyName) {
					unique = false;
				}
			});
			if ( unique) {
				this.DivisionList.push({
					companyName: item.companyName,
					value: item.companyName});
			}

			this.updateDivisionList.forEach((j) => {
				if (item.companyName === j.companyName) {
					unique = false;
				}
			});
			if ( unique) {
				this.updateDivisionList.push({
					companyName: item.companyName,
					value: item.companyName});
			}
				// console.log(this.DivisionList)
			this.addDivisionList.forEach((j) => {
				if (item.companyName === j.companyName) {
					unique = false;
				}
			});
			if ( unique) {
				this.addDivisionList.push({
					companyName: item.companyName,
					value: item.companyName});
			}
				// console.log(this.addDivisionList)
				this.flesSelect = this.addDivisionList[0].companyName;
				// console.log(this.flesSelect)
		});
		this.formPatchValue();
	});
  }
  // 获取所有角色方法
  getAllRoll(): void {
	this.UserService.FindAllRoles().subscribe((r) => {
		// console.log(r);
		const tempData: any = r;
		tempData.Body.findAllRolesResponse.roleList.forEach((item) => {
			// console.log(item)
			// console.log(item.description)
			this.AllRoleList.push({
				description: item.description,
				value: item.name
			});
			this.updateRoleList.push({
				description: item.description,
				roleId: item.name
			});
			// console.log(this.updateRoleList)
			// console.log(this.AllRoleList);
			this.roleSelectB = this.AllRoleList[0].description;
			this.addRoleList.push({
				description: item.description,
				value: item.name
			});
			// console.log(item)
			// console.log(this.addRoleList);
			// console.log(this.addRoleList);
			this.roleSelect = this.addRoleList[0].description;
		});
		});
	}
	// 获取点击的角色
	changeRole(event) {
		 // console.log(event);
	}
	changeAddRole(event) {
		// console.log(event);
		if (event === 'Admin Role') {
			// console.log('ROLE_ADMIN');
		} else if (event === 'Operator Role') {
			// console.log('ROLE_OPERATOR');
		} else if (event === 'Maintenance') {
			// console.log('ROLE_MAINTENANCE');
		}
	}
	submitUpdateForm() {
		const value = this.updateUserForm.value;
		// 'roleId':roleId,'userId':userId,'username':username}},'UserWebService')

		const data = {
			'retryCount': 0,
			'companyName': value.companyName,
			'enabled': value.enabled,
			'password': value.password,
			'roleId': value.role,
			'userId': value.userId,
			'username': value.username
		};
		this.UserService.updateUser(data).subscribe((r) => {
			this.GetAllUsers();
			this.message.create('success', `Successful update of users`);
		});
	}
}