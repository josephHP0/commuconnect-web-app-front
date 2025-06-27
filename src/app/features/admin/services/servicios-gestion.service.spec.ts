import { TestBed } from '@angular/core/testing';

import { ServiciosGestionService } from './servicios-gestion.service';

describe('ServiciosGestionService', () => {
  let service: ServiciosGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 