import { TestBed } from '@angular/core/testing';

import { ManagerBaseService } from './manager-base.service';

describe('ManagerBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerBaseService = TestBed.get(ManagerBaseService);
    expect(service).toBeTruthy();
  });
});
