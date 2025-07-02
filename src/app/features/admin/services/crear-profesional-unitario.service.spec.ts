import { TestBed } from '@angular/core/testing';

import { CrearProfesionalUnitarioService } from './crear-profesional-unitario.service';

describe('CrearProfesionalUnitarioService', () => {
  let service: CrearProfesionalUnitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearProfesionalUnitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
