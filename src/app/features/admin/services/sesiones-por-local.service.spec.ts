import { TestBed } from '@angular/core/testing';

import { SesionesPorLocalService } from './sesiones-por-local.service';

describe('SesionesPorLocalService', () => {
  let service: SesionesPorLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionesPorLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
