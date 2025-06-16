import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReservaVirtualComponent } from './nueva-reserva-virtual.component';

describe('NuevaReservaVirtualComponent', () => {
  let component: NuevaReservaVirtualComponent;
  let fixture: ComponentFixture<NuevaReservaVirtualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaReservaVirtualComponent]
    });
    fixture = TestBed.createComponent(NuevaReservaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
