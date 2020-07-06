import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthorizedGuard } from './unauthorized.guard';

describe('UnauthorizedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthorizedGuard]
    });
  });

  it('should ...', inject([UnauthorizedGuard], (guard: UnauthorizedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
