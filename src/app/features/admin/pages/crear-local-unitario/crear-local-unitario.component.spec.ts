import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLocalUnitarioComponent } from './crear-local-unitario.component';

describe('CrearLocalUnitarioComponent', () => {
  let component: CrearLocalUnitarioComponent;
  let fixture: ComponentFixture<CrearLocalUnitarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearLocalUnitarioComponent]
    });
    fixture = TestBed.createComponent(CrearLocalUnitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
