import { TestBed } from '@angular/core/testing';

import { ServiciosPorComunidadService } from './servicios-por-comunidad.service';

describe('ServiciosPorComunidadService', () => {
  let service: ServiciosPorComunidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosPorComunidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
