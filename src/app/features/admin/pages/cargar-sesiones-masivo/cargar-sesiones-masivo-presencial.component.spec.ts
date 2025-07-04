import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarSesionesMasivoPresencialComponent } from './cargar-sesiones-masivo-presencial.component';

describe('CargarSesionesMasivoPresencialComponent', () => {
  let component: CargarSesionesMasivoPresencialComponent;
  let fixture: ComponentFixture<CargarSesionesMasivoPresencialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarSesionesMasivoPresencialComponent]
    });
    fixture = TestBed.createComponent(CargarSesionesMasivoPresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 