import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDepartmentListComponent } from './order-department-list.component';

describe('OrderDepartmentListComponent', () => {
  let component: OrderDepartmentListComponent;
  let fixture: ComponentFixture<OrderDepartmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDepartmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
