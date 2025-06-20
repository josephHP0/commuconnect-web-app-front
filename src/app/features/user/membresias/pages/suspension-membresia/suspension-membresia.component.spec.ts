import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionMembresiaComponent } from './suspension-membresia.component';

describe('SuspensionMembresiaComponent', () => {
  let component: SuspensionMembresiaComponent;
  let fixture: ComponentFixture<SuspensionMembresiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuspensionMembresiaComponent]
    });
    fixture = TestBed.createComponent(SuspensionMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
