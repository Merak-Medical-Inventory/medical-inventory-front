import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDepartmentFormComponent } from './order-department-form.component';

describe('OrderDepartmentFormComponent', () => {
  let component: OrderDepartmentFormComponent;
  let fixture: ComponentFixture<OrderDepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDepartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
