import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaxcomunidadComponent } from './membresiaxcomunidad.component';

describe('MembresiaxcomunidadComponent', () => {
  let component: MembresiaxcomunidadComponent;
  let fixture: ComponentFixture<MembresiaxcomunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembresiaxcomunidadComponent]
    });
    fixture = TestBed.createComponent(MembresiaxcomunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
