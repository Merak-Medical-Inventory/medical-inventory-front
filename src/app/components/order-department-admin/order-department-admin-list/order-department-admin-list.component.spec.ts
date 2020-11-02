import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDepartmentAdminListComponent } from './order-department-admin-list.component';

describe('OrderDepartmentAdminListComponent', () => {
  let component: OrderDepartmentAdminListComponent;
  let fixture: ComponentFixture<OrderDepartmentAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDepartmentAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDepartmentAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
