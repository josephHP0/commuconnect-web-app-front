import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSesionesPorProfesionalesComponent } from './lista-sesiones-por-profesionales.component';

describe('ListaSesionesPorProfesionalesComponent', () => {
  let component: ListaSesionesPorProfesionalesComponent;
  let fixture: ComponentFixture<ListaSesionesPorProfesionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSesionesPorProfesionalesComponent]
    });
    fixture = TestBed.createComponent(ListaSesionesPorProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
