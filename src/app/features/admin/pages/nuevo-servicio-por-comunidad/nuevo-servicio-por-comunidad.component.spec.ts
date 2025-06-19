import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoServicioPorComunidadComponent } from './nuevo-servicio-por-comunidad.component';

describe('NuevoServicioPorComunidadComponent', () => {
  let component: NuevoServicioPorComunidadComponent;
  let fixture: ComponentFixture<NuevoServicioPorComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoServicioPorComunidadComponent]
    });
    fixture = TestBed.createComponent(NuevoServicioPorComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
