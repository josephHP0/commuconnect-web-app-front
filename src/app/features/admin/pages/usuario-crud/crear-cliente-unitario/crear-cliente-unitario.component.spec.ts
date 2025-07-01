import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClienteUnitarioComponent } from './crear-cliente-unitario.component';

describe('CrearClienteUnitarioComponent', () => {
  let component: CrearClienteUnitarioComponent;
  let fixture: ComponentFixture<CrearClienteUnitarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearClienteUnitarioComponent]
    });
    fixture = TestBed.createComponent(CrearClienteUnitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
