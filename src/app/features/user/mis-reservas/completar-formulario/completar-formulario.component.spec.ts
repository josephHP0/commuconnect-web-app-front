import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarFormularioComponent } from './completar-formulario.component';

describe('CompletarFormularioComponent', () => {
  let component: CompletarFormularioComponent;
  let fixture: ComponentFixture<CompletarFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletarFormularioComponent]
    });
    fixture = TestBed.createComponent(CompletarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
