import { TestBed } from '@angular/core/testing';

import { ReportesAuditoriaService } from './reportes-auditoria.service';

describe('ReportesAuditoriaService', () => {
  let service: ReportesAuditoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesAuditoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 