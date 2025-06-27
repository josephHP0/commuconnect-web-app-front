import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarLocalesMasivoComponent } from './cargar-locales-masivo.component';

describe('CargarLocalesMasivoComponent', () => {
  let component: CargarLocalesMasivoComponent;
  let fixture: ComponentFixture<CargarLocalesMasivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarLocalesMasivoComponent]
    });
    fixture = TestBed.createComponent(CargarLocalesMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
