import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSesionPorProfesionalComponent } from './detalle-sesion-por-profesional.component';

describe('DetalleSesionPorProfesionalComponent', () => {
  let component: DetalleSesionPorProfesionalComponent;
  let fixture: ComponentFixture<DetalleSesionPorProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSesionPorProfesionalComponent]
    });
    fixture = TestBed.createComponent(DetalleSesionPorProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
