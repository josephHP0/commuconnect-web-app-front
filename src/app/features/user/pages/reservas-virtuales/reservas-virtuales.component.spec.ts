import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasVirtualesService } from '../../services/reservas/reservas-virtuales.service';
import {ReservasVirtualesComponent} from './reservas-virtuales.component';

describe('ReservasVirtualesComponent', () => {
  let component: ReservasVirtualesComponent;
  let fixture: ComponentFixture<ReservasVirtualesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasVirtualesComponent]
    });
    fixture = TestBed.createComponent(ReservasVirtualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
