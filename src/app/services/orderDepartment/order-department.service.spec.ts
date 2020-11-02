import { TestBed } from '@angular/core/testing';

import { OrderDepartmentService } from './order-department.service';

describe('OrderDepartmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDepartmentService = TestBed.get(OrderDepartmentService);
    expect(service).toBeTruthy();
  });
});
