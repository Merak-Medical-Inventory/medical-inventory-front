import { TestBed } from '@angular/core/testing';

import { GeneralItemService } from './general-item.service';

describe('GeneralItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralItemService = TestBed.get(GeneralItemService);
    expect(service).toBeTruthy();
  });
});
