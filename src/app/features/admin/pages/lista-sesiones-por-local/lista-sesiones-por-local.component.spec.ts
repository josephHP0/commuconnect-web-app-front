import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSesionesPorLocalComponent } from './lista-sesiones-por-local.component';

describe('ListaSesionesPorLocalComponent', () => {
  let component: ListaSesionesPorLocalComponent;
  let fixture: ComponentFixture<ListaSesionesPorLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSesionesPorLocalComponent]
    });
    fixture = TestBed.createComponent(ListaSesionesPorLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
