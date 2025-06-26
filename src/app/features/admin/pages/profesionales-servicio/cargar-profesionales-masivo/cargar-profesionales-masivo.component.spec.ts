import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarProfesionalesMasivoComponent } from './cargar-profesionales-masivo.component';

describe('CargarProfesionalesMasivoComponent', () => {
  let component: CargarProfesionalesMasivoComponent;
  let fixture: ComponentFixture<CargarProfesionalesMasivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarProfesionalesMasivoComponent]
    });
    fixture = TestBed.createComponent(CargarProfesionalesMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
