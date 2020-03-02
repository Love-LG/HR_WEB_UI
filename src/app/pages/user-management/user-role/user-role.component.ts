import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addAllToArray } from '@angular/core/src/render3/util';
// import {EventsService} from '../../events/events.service';
import { UserService } from '../user-management.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { threadId } from 'worker_threads';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}


@Component({
  selector: 'emas-user',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  @Input() addUserPageIsVisible: boolean;
  @Input() exportsList: any;
  @Output() closeModal = new EventEmitter();

  validateForm: FormGroup;


  constructor(
    private fb: FormBuilder
  ) { }

  handleCancelMiddle(): void {
    console.log('click cancel');
    this.addUserPageIsVisible = false;
    this.closeModal.emit();
  }

  handleOkMiddle(): void {
    console.log('click OK');
    this.addUserPageIsVisible = false;
    this.closeModal.emit();
  }

  initForm() {
    this.validateForm = this.fb.group({
      userName: [{ value: null, disabled: false }],
      passWord: [{ value: null, disabled: false }],
      phone: [{ value: null, disabled: false }]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

}
