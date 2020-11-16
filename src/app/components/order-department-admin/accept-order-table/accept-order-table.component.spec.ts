import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrderTableComponent } from './accept-order-table.component';

describe('AcceptOrderTableComponent', () => {
  let component: AcceptOrderTableComponent;
  let fixture: ComponentFixture<AcceptOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
