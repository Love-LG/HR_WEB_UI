import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'emas-public-modal',
  templateUrl: './public-modal.component.html',
  styleUrls: ['./public-modal.component.css']
})
export class PublicModalComponent implements OnInit {
  @Input() visible = false;
  @Input() isVisible = false;
  @Input() flag: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  constructor(  ) { }

  ngOnInit() {
  }

  click() {
    console.log('click');
  }
  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  handleOk() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
