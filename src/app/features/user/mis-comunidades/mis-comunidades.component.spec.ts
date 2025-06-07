import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisComunidadesComponent } from './mis-comunidades.component';

describe('MisComunidadesComponent', () => {
  let component: MisComunidadesComponent;
  let fixture: ComponentFixture<MisComunidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisComunidadesComponent]
    });
    fixture = TestBed.createComponent(MisComunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
