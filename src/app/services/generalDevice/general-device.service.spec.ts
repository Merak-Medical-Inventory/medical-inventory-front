import { TestBed } from '@angular/core/testing';

import { GeneralDeviceService } from './general-device.service';

describe('GeneralDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralDeviceService = TestBed.get(GeneralDeviceService);
    expect(service).toBeTruthy();
  });
});
