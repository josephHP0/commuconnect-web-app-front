import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesServicioComponent } from './profesionales-servicio.component';

describe('ProfesionalesServicioComponent', () => {
  let component: ProfesionalesServicioComponent;
  let fixture: ComponentFixture<ProfesionalesServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesionalesServicioComponent]
    });
    fixture = TestBed.createComponent(ProfesionalesServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
