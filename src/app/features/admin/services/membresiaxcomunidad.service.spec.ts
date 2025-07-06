import { TestBed } from '@angular/core/testing';

import { MembresiaxcomunidadService } from './membresiaxcomunidad.service';

describe('MembresiaxcomunidadService', () => {
  let service: MembresiaxcomunidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembresiaxcomunidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
