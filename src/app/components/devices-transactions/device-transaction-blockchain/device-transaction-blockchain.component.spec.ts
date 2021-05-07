import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTransactionBlockchainComponent } from './device-transaction-blockchain.component';

describe('DeviceTransactionBlockchainComponent', () => {
  let component: DeviceTransactionBlockchainComponent;
  let fixture: ComponentFixture<DeviceTransactionBlockchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTransactionBlockchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTransactionBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
