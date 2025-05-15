import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionComunidadComponent } from './seleccion-comunidad.component';

describe('SeleccionComunidadComponent', () => {
  let component: SeleccionComunidadComponent;
  let fixture: ComponentFixture<SeleccionComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionComunidadComponent]
    });
    fixture = TestBed.createComponent(SeleccionComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
