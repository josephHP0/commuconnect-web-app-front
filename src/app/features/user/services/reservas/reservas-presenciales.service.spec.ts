import { TestBed } from '@angular/core/testing';

import { ReservasPresencialesService } from './reservas-presenciales.service';

describe('ReservasPresencialesService', () => {
  let service: ReservasPresencialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasPresencialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
