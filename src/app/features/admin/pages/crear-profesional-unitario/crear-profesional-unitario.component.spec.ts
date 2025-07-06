import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesionalUnitarioComponent } from './crear-profesional-unitario.component';

describe('CrearProfesionalUnitarioComponent', () => {
  let component: CrearProfesionalUnitarioComponent;
  let fixture: ComponentFixture<CrearProfesionalUnitarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProfesionalUnitarioComponent]
    });
    fixture = TestBed.createComponent(CrearProfesionalUnitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
