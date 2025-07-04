import { TestBed } from '@angular/core/testing';

import { SesionesPorProfesionalService } from './sesiones-por-profesional.service';

describe('SesionesPorProfesionalService', () => {
  let service: SesionesPorProfesionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionesPorProfesionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
