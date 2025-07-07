import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KibanaService, KibanaLogEntry } from './kibana.service';
import { environment } from 'src/environments/environment';

describe('KibanaService', () => {
  let service: KibanaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KibanaService]
    });
    service = TestBed.inject(KibanaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get logs from backend', () => {
    const mockLogs: KibanaLogEntry[] = [
      {
        '@timestamp': '2024-01-01T10:00:00Z',
        level: 'ERROR',
        message: 'Test error',
        source: 'frontend',
        component: 'TestComponent',
        user_id: '123'
      }
    ];

    service.getLogsFromBackend('ERROR', undefined, undefined, undefined, 50, 0).subscribe(logs => {
      expect(logs).toEqual(mockLogs);
      expect(logs.length).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/admin/logs?limit=50&offset=0&level=ERROR`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockLogs);
  });

  it('should log error with convenience method', () => {
    const error = new Error('Test error');
    
    service.logError('Test error message', error, 'TestComponent').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/admin/logs/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.level).toBe('ERROR');
    expect(req.request.body.message).toBe('Test error message');
    expect(req.request.body.component).toBe('TestComponent');
    expect(req.request.body.stack_trace).toBe(error.stack);
    
    req.flush({ success: true });
  });

  it('should log warning with convenience method', () => {
    service.logWarning('Test warning message', 'TestComponent').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/admin/logs/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.level).toBe('WARN');
    expect(req.request.body.message).toBe('Test warning message');
    expect(req.request.body.component).toBe('TestComponent');
    
    req.flush({ success: true });
  });

  it('should log info with convenience method', () => {
    service.logInfo('Test info message', 'TestComponent', 'test_action').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/admin/logs/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.level).toBe('INFO');
    expect(req.request.body.message).toBe('Test info message');
    expect(req.request.body.component).toBe('TestComponent');
    expect(req.request.body.action).toBe('test_action');
    
    req.flush({ success: true });
  });

  it('should check backend connection', () => {
    const mockHealth = { status: 'ok' };

    service.checkBackendConnection().subscribe(health => {
      expect(health).toEqual(mockHealth);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/health`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockHealth);
  });

  it('should include authentication headers for backend requests', () => {
    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token_type') return 'Bearer';
      if (key === 'access_token') return 'test-token';
      return null;
    });

    service.getLogsFromBackend().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/admin/logs?limit=100&offset=0`);
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    
    req.flush([]);
  });
}); 