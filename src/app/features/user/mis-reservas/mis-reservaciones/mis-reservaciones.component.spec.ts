import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservacionesComponent } from './mis-reservaciones.component';

describe('MisReservacionesComponent', () => {
  let component: MisReservacionesComponent;
  let fixture: ComponentFixture<MisReservacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisReservacionesComponent]
    });
    fixture = TestBed.createComponent(MisReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
