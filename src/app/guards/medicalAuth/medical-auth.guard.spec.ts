import { TestBed, async, inject } from '@angular/core/testing';

import { MedicalAuthGuard } from './medical-auth.guard';

describe('MedicalAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalAuthGuard]
    });
  });

  it('should ...', inject([MedicalAuthGuard], (guard: MedicalAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
