import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addAllToArray } from '@angular/core/src/render3/util';
// import {EventsService} from '../../events/events.service';
import {UserService} from '../user-management.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { threadId } from 'worker_threads';
import { NzMessageService } from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http'
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
  
  isVisible = false;
  isConfirmLoading = false;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
    ngOnInit(): void {
    }

}