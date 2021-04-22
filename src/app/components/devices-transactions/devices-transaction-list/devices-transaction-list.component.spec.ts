import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesTransactionListComponent } from './devices-transaction-list.component';

describe('DevicesTransactionListComponent', () => {
  let component: DevicesTransactionListComponent;
  let fixture: ComponentFixture<DevicesTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
