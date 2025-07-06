import { TestBed } from '@angular/core/testing';

import { CrearLocalUnitarioService } from './crear-local-unitario.service';

describe('CrearLocalUnitarioService', () => {
  let service: CrearLocalUnitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearLocalUnitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
