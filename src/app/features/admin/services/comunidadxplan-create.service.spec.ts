import { TestBed } from '@angular/core/testing';

import { ComunidadxplanCreateService } from './comunidadxplan-create.service';

describe('ComunidadxplanCreateService', () => {
  let service: ComunidadxplanCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunidadxplanCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
