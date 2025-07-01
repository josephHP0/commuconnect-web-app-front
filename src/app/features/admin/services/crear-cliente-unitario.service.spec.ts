import { TestBed } from '@angular/core/testing';

import { CrearClienteUnitarioService } from './crear-cliente-unitario.service';

describe('CrearClienteUnitarioService', () => {
  let service: CrearClienteUnitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearClienteUnitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
