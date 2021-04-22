import { TestBed } from '@angular/core/testing';

import { DeviceTransactionService } from './device-transaction.service';

describe('DeviceTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceTransactionService = TestBed.get(DeviceTransactionService);
    expect(service).toBeTruthy();
  });
});
