import { TestBed, async, inject } from '@angular/core/testing';

import { SuperuserAuthGuard } from './superuser-auth.guard';

describe('SuperuserAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperuserAuthGuard]
    });
  });

  it('should ...', inject([SuperuserAuthGuard], (guard: SuperuserAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
