import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseinfoComponent } from './add-houseinfo.component';

describe('AddHouseinfoComponent', () => {
  let component: AddHouseinfoComponent;
  let fixture: ComponentFixture<AddHouseinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHouseinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
