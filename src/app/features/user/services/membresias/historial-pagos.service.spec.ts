import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HistorialPagosService, InscripcionPago, DetallePago } from './historial-pagos.service';

describe('HistorialPagosService', () => {
  let service: HistorialPagosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HistorialPagosService]
    });

    service = TestBed.inject(HistorialPagosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener historial de pagos', () => {
    const mockResponse: InscripcionPago[] = [
      { id_inscripcion: 1, fecha_inicio: '2025-04-01', titulo_plan: 'Plan Premium', precio: 129.99 }
    ];

    service.getHistorialPagos().subscribe(pagos => {
      expect(pagos.length).toBe(1);
      expect(pagos[0].titulo_plan).toBe('Plan Premium');
    });

    const req = httpMock.expectOne('/api/billing/usuario/inscripciones');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener el detalle de un pago', () => {
    const mockDetalle: DetallePago = {
      nombre_membresia: 'Plan Premium',
      fecha_pago: '2025-04-01',
      hora_pago: '13:49 pm',
      id_pago: 123456,
      tarjeta: '324891-329'
    };

    service.getDetallePago(1).subscribe(detalle => {
      expect(detalle.nombre_membresia).toBe('Plan Premium');
      expect(detalle.id_pago).toBe(123456);
    });

    const req = httpMock.expectOne('/api/billing/inscripcion/1/detalle');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetalle);
  });
});
