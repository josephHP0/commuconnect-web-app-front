import { TestBed } from '@angular/core/testing';

import { ReservasVirtualesService } from './reservas-virtuales.service';

describe('ReservasVirtualesService', () => {
  let service: ReservasVirtualesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasVirtualesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
