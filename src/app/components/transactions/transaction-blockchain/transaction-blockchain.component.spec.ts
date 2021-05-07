import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBlockchainComponent } from './transaction-blockchain.component';

describe('TransactionBlockchainComponent', () => {
  let component: TransactionBlockchainComponent;
  let fixture: ComponentFixture<TransactionBlockchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBlockchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
