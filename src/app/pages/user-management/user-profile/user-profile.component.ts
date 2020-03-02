import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-management.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
	selector: 'emas-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	@Input() editUserPageIsVisible: boolean;
	@Input() dataTr: any;
	@Output() closeModal = new EventEmitter();

	validateForm: FormGroup;


	constructor(
		private fb: FormBuilder
	) { }

	handleCancelMiddle(): void {
		console.log('click cancel');
		this.editUserPageIsVisible = false;
		this.closeModal.emit();
	}

	handleOkMiddle(): void {
		console.log('click OK');
		this.editUserPageIsVisible = false;
		this.closeModal.emit();
	}

	initForm() {
		this.validateForm = this.fb.group({
			userName: [{ value: null, disabled: false }],
			passWord: [{ value: null, disabled: false }],
			phone: [{ value: null, disabled: false }]
		});
	}

	fatchForm(): void {
		this.validateForm.patchValue({
			userName: this.dataTr.name,
			passWord: this.dataTr.passWord,
			phone: this.dataTr.phoneNum
		});
	}

	ngOnInit(): void {
		this.initForm();
		console.log(this.dataTr);

		this.fatchForm();
	}
}
