import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSesionPorLocalComponent } from './detalle-sesion-por-local.component';

describe('DetalleSesionPorLocalComponent', () => {
  let component: DetalleSesionPorLocalComponent;
  let fixture: ComponentFixture<DetalleSesionPorLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSesionPorLocalComponent]
    });
    fixture = TestBed.createComponent(DetalleSesionPorLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
