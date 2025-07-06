import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadxplanCreateComponent } from './comunidadxplan-create.component';

describe('ComunidadxplanCreateComponent', () => {
  let component: ComunidadxplanCreateComponent;
  let fixture: ComponentFixture<ComunidadxplanCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadxplanCreateComponent]
    });
    fixture = TestBed.createComponent(ComunidadxplanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
