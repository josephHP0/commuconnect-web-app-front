import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarSesionesMasivoComponent } from './cargar-sesiones-masivo.component';

describe('CargarSesionesMasivoComponent', () => {
  let component: CargarSesionesMasivoComponent;
  let fixture: ComponentFixture<CargarSesionesMasivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarSesionesMasivoComponent]
    });
    fixture = TestBed.createComponent(CargarSesionesMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
