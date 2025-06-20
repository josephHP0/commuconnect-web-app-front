import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReservaPresencialComponent } from './nueva-reserva-presencial.component';

describe('NuevaReservaPresencialComponent', () => {
  let component: NuevaReservaPresencialComponent;
  let fixture: ComponentFixture<NuevaReservaPresencialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaReservaPresencialComponent]
    });
    fixture = TestBed.createComponent(NuevaReservaPresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
