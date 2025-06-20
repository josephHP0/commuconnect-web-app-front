import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarClienteMasivoComponent } from './cargar-cliente-masivo.component';

describe('CargarClienteMasivoComponent', () => {
  let component: CargarClienteMasivoComponent;
  let fixture: ComponentFixture<CargarClienteMasivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarClienteMasivoComponent]
    });
    fixture = TestBed.createComponent(CargarClienteMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
