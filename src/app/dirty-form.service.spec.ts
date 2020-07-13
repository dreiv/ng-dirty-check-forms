import { TestBed } from '@angular/core/testing';

import { DirtyFormGuard } from './dirty-form.service';

describe('DirtyFormGuard', () => {
  let service: DirtyFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirtyFormGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
