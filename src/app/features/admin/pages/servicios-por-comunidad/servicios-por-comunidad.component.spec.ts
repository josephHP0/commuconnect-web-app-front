import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPorComunidadComponent } from './servicios-por-comunidad.component';

describe('ServiciosPorComunidadComponent', () => {
  let component: ServiciosPorComunidadComponent;
  let fixture: ComponentFixture<ServiciosPorComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosPorComunidadComponent]
    });
    fixture = TestBed.createComponent(ServiciosPorComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
