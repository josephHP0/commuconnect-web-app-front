import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAuditoriaComponent } from './reportes-auditoria.component';

describe('ReportesAuditoriaComponent', () => {
  let component: ReportesAuditoriaComponent;
  let fixture: ComponentFixture<ReportesAuditoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesAuditoriaComponent]
    });
    fixture = TestBed.createComponent(ReportesAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 