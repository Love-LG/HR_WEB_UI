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
  
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  listOfAllData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private message: NzMessageService,
    private http:HttpClient
    ) { }

    currentPageDataChange($event: ItemData[]): void {
      this.listOfDisplayData = $event;
      this.refreshStatus();
    }
  
    refreshStatus(): void {
      this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
      this.isIndeterminate =
        this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }
  
    checkAll(value: boolean): void {
      this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
      this.refreshStatus();
    }
  
    ngOnInit(): void {
      for (let i = 0; i < 100; i++) {
        this.listOfAllData.push({
          id: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`
        });
      }
    }

}